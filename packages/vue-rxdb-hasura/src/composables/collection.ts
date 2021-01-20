import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { toObserver, useSubscription } from '@vueuse/rxjs'
import { map } from 'rxjs/operators'
import { computed, ComputedRef, Ref, ref, unref, watch, watchEffect } from 'vue'

import { useDB } from './database'

export const useCollection = (
  name: string | Ref<string>
): ComputedRef<ContentsCollection | undefined> => {
  const collections = useCollections()
  return computed(() => collections.value?.[unref(name)])
}

export const useDocumentCollection = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<ContentsDocument | any>
): ComputedRef<ContentsCollection> => computed(() => document.value.collection)

export const useCollections = (): Ref<Record<string, ContentsCollection>> => {
  const db = useDB()
  const collections: Ref<Record<string, ContentsCollection>> = ref({})
  // TODO tricky watchEffect
  watchEffect(
    () =>
      db.value &&
      useSubscription(db.value.contents$.subscribe(toObserver(collections)))
  )
  return collections
}

export const useSingleton = (
  collectionName: string | Ref<string>
): Readonly<Ref<ContentsDocument | undefined>> => {
  const document: Ref<ContentsDocument | undefined> = ref()
  const collection = useCollection(collectionName)
  watch(
    () => collection.value,
    col => {
      col &&
        useSubscription(
          col
            .find()
            .limit(1)
            .$.pipe(map(x => x[0]))
            .subscribe(toObserver(document))
        )
    },
    { immediate: true }
  )
  return document
}
