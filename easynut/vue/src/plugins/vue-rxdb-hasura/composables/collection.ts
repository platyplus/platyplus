import { GenericRxCollection, GenericRxDocument } from '@platyplus/rxdb-hasura'
import { computed, ComputedRef, isRef, Ref } from 'vue'

import { useDB } from './database'

export const useCollection = (
  name: string | Ref<string>
): ComputedRef<GenericRxCollection | undefined> => {
  const db = useDB()
  return computed(() => db.value?.collections[isRef(name) ? name.value : name])
}

export const useDocumentCollection = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<GenericRxDocument | any>
): ComputedRef<GenericRxCollection> => computed(() => document.value.collection)

export const useCollections = (): ComputedRef<
  Record<string, GenericRxCollection>
> => {
  const db = useDB()
  return computed(() => db?.value?.hasura || {})
}
