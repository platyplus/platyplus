import {
  ContentsCollection,
  ContentsDocument,
  Metadata
} from '@platyplus/rxdb-hasura'
import { toObserver, useSubscription } from '@vueuse/rxjs'
import equal from 'deep-equal'
import { RxSchema } from 'rxdb'
import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'
import { Subscription } from 'rxjs'
import {
  computed,
  ComputedRef,
  Ref,
  ref,
  watch,
  watchEffect,
  WritableComputedRef
} from 'vue'
import { useStore } from 'vuex'

import { useDocumentCollection } from './collection'

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
    return collection.database.hasura[refCollectionName]
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
            fieldValue.value = Array.from(idMap.values())
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

export const useFieldValue = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<ContentsDocument | any>,
  name: Ref<string>
): Readonly<Ref<Readonly<T>>> => {
  const fieldValue = ref()
  const store = useStore()
  watchEffect(() =>
    useSubscription(
      document.value.get$(name.value).subscribe(toObserver(fieldValue))
    )
  )

  return computed(
    () =>
      (store.getters['rxdb/getField'](document.value, name.value) as T) ??
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
): { model: WritableComputedRef<T>; changed: ComputedRef<boolean> } => {
  const fieldValue = useFieldValue<T>(document, name)
  const store = useStore()

  // TODO move setter to useFieldValue, and consider even removing the useFormProperty composable
  const model = computed<T>({
    get: () => fieldValue.value,
    set: (value: T) =>
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
  return { model, changed }
}
