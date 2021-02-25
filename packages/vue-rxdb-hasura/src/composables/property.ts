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
  name: Ref<string>
): Readonly<Ref<Readonly<T>>> => {
  const fieldValue = ref()
  const store = useStore()
  const refCollection = computed<ContentsCollection>(() => {
    const collection = document.value.collection
    const refCollectionName = collection.schema.jsonSchema.properties[
      name.value
    ].ref as string
    return collection.database.collections[refCollectionName]
  })
  let subscription: Subscription | undefined
  watch(
    () =>
      (store.getters['rxdb/getField'](document.value, name.value) ||
        document.value?.get(name.value)) as string | string[] | null,
    async newVal => {
      if (typeof newVal === 'string') {
        // * object relationship
        subscription = refCollection.value
          .findOne(newVal)
          .$.subscribe(toObserver(fieldValue))
      } else if (Array.isArray(newVal)) {
        // * array relationship
        subscription = refCollection.value
          .findByIds$(newVal)
          .subscribe(idMap => {
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
    () => unref(name) && document.value,
    doc =>
      doc &&
      useSubscription(doc.get$(unref(name)).subscribe(toObserver(value))),
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
  name: Ref<string>
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
        field: name.value,
        value: value ?? undefined
      })
  })
  const changed = computed(
    () =>
      store.getters['rxdb/getField'](document.value, name.value) !==
        undefined && !equal(fieldValue.value, document.value[name.value])
  )
  const title = computed(() => document.value.collection.title(name.value))
  return { model, changed, title }
}
