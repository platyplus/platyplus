import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { toObserver, useSubscription } from '@vueuse/rxjs'
import { computed, ComputedRef, Ref, ref, unref, watchEffect } from 'vue'

import { useDB } from './database'

export const useCollection = (
  name: string | Ref<string>
): ComputedRef<ContentsCollection | undefined> => {
  const db = useDB()
  return computed(() => db.value?.collections[unref(name)])
}

export const useDocumentCollection = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<ContentsDocument | any>
): ComputedRef<ContentsCollection> => computed(() => document.value.collection)

export const useCollections = (): Ref<Record<string, ContentsCollection>> => {
  const db = useDB()
  const collections: Ref<Record<string, ContentsCollection>> = ref({})
  watchEffect(
    () =>
      db.value &&
      useSubscription(db.value.hasura$.subscribe(toObserver(collections)))
  )
  return collections
}
