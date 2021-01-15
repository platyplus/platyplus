import {
  Contents,
  ContentsCollection,
  ContentsDocument,
  documentLabel
} from '@platyplus/rxdb-hasura'
import { toObserver, useSubscription } from '@vueuse/rxjs'
import { map } from 'rxjs/operators'
import { v4 as uuid } from 'uuid'
import { ComputedRef, onMounted, Ref, ref, unref, watchEffect } from 'vue'

export const useDocumentLabel = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<ContentsDocument | any>
): Readonly<Ref<Readonly<string | null>>> => {
  const result = ref<string | null>(null)
  watchEffect(() => {
    document.value &&
      useSubscription(
        document.value.$.pipe(
          map<Contents, string | null>(val =>
            documentLabel(val, document.value.collection)
          )
        ).subscribe(toObserver(result))
      )
  })
  return result
}

export const newDocumentFactory = (
  collection: ContentsCollection
): ContentsDocument => {
  const newDoc = collection.newDocument()
  newDoc[collection.schema.primaryPath] = uuid()
  return newDoc
}

export const useNewDocumentFactory = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collection: Ref<ContentsCollection | any>
): {
  next: () => ContentsDocument
  newDoc: Ref<ContentsDocument>
} => {
  const newDoc = ref() as Ref<ContentsDocument>
  onMounted(() => {
    newDoc.value = newDocumentFactory(collection.value)
  })
  return {
    next: (): ContentsDocument => {
      newDoc.value = newDocumentFactory(collection.value)
      return newDoc.value
    },
    newDoc
  }
}

// * Returns the document with the given id, or a new temporary document otherwise
export const useDocument = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collection: ComputedRef<ContentsCollection | any | undefined>,
  id: Ref<string | undefined> | string | undefined
): Ref<ContentsDocument | undefined> => {
  const document = ref<ContentsDocument>()
  watchEffect(() => {
    if (collection.value) {
      if (unref(id)) {
        useSubscription(
          collection.value
            .findOne(unref(id))
            .$.subscribe((doc: ContentsDocument) => {
              document.value = doc || undefined
            })
        )
      } else {
        if (!document.value) {
          document.value = newDocumentFactory(collection.value)
        }
      }
    }
  })

  return document
}
