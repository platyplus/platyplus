import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { toObserver, useSubscription } from '@vueuse/rxjs'
import equal from 'deep-equal'
import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'
import { Subscription } from 'rxjs'
import {
  computed,
  ComputedRef,
  Ref,
  ref,
  unref,
  watch,
  WritableComputedRef
} from 'vue'
import { useStore } from 'vuex'

export const useRefFieldValue = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<ContentsDocument | any>,
  name: Ref<string> | string
): Readonly<Ref<Readonly<T>>> => {
  const fieldValue = ref()
  const store = useStore()
  const refCollection = computed<ContentsCollection>(() => {
    const collection = document.value.collection as ContentsCollection
    const refCollectionName = collection.schema.jsonSchema.properties[
      unref(name)
    ].ref as string
    return collection.database.collections[refCollectionName]
  })
  const refKey = computed<string>(() => {
    const collection = document.value.collection as ContentsCollection
    return collection.metadata.relationships.find(
      rel => rel.rel_name === unref(name)
    )?.mapping[0].remote_column_name as string
  })
  let subscription: Subscription | undefined
  watch(
    () =>
      (store.getters['rxdb/getField'](document.value, unref(name)) ||
        document.value?.get(unref(name))) as string | string[] | null,
    async newVal => {
      if (typeof newVal === 'string') {
        // * object relationship
        subscription = refCollection.value
          .findOne({ selector: { [refKey.value]: newVal } })
          .$.subscribe(toObserver(fieldValue))
      } else if (Array.isArray(newVal)) {
        // * array relationship
        subscription = refCollection.value
          .find({ selector: { id: { $in: newVal } } }) // ! TODO inverted remote_column_name, can't use refKey.value
          .$.subscribe(idMap => {
            fieldValue.value = [...idMap.values()]
          })
      } else {
        fieldValue.value = null
        subscription?.unsubscribe()
      }
    },
    { immediate: true }
  )
  return fieldValue
}

// * Reactive value of a document property
export const usePropertyValue = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<ContentsDocument | any>,
  name: Ref<string> | string
): Readonly<Ref<Readonly<T | undefined>>> => {
  const value = ref<T>()
  watch(
    () => unref(name) && document.value?.get$(unref(name)),
    prop => prop && useSubscription(prop.subscribe(toObserver(value))),
    { immediate: true }
  )
  return value
}

// * Reactive value of a form property
export const useFieldValue = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<ContentsDocument | any>,
  name: Ref<string> | string
): Readonly<Ref<Readonly<T | undefined>>> => {
  const fieldValue = usePropertyValue<T>(document, name)
  const store = useStore()

  return computed(
    () =>
      (store.getters['rxdb/getField'](document.value, unref(name)) as T) ??
      fieldValue.value
  )
}

export const useProperty = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<ContentsDocument | any>,
  name: Ref<string>
): ComputedRef<TopLevelProperty | PrimaryProperty> =>
  computed(
    () => document.value.collection.schema.jsonSchema.properties[name.value]
  )

export const useFormProperty = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<ContentsDocument | any>,
  name: Ref<string> | string
): {
  model: WritableComputedRef<T | undefined>
  changed: ComputedRef<boolean>
  title: ComputedRef<string>
} => {
  const fieldValue = useFieldValue<T>(document, name)
  const store = useStore()

  // TODO move setter to useFieldValue, and consider even removing the useFormProperty composable
  const model = computed<T | undefined>({
    get: () => fieldValue.value,
    set: (value: T | undefined) =>
      store.commit('rxdb/setField', {
        document: document.value,
        field: unref(name),
        value: value ?? undefined
      })
  })
  const changed = computed(
    () =>
      store.getters['rxdb/getField'](document.value, unref(name)) !==
        undefined && !equal(fieldValue.value, document.value[unref(name)])
  )
  const title = computed(() => document.value.collection.title(unref(name)))
  return { model, changed, title }
}
