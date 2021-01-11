import {
  Contents,
  ContentsCollection,
  ContentsDocument,
  documentLabel
} from '@platyplus/rxdb-hasura'
import { toObserver, useSubscription } from '@vueuse/rxjs'
import { map } from 'rxjs/operators'
import { v4 as uuid } from 'uuid'
import { onMounted, Ref, ref, watchEffect } from 'vue'

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
