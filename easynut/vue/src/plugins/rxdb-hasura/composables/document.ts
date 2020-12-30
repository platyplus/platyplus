import { Subscription } from 'rxjs'
import { v4 as uuid } from 'uuid'
import { inject, onMounted, Ref, ref, watch } from 'vue'

import { documentLabel } from '../helpers'
import { DefaultRxDBKey, RxDBHasuraPlugin } from '../plugin'
import {
  GenericDocument,
  GenericRxCollection,
  GenericRxDocument
} from '../types'

export const useDocumentLabel = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: Ref<GenericRxDocument | any>
): Readonly<Ref<Readonly<string | null>>> => {
  const plugin = inject<RxDBHasuraPlugin<unknown>>(DefaultRxDBKey)
  const result = ref<string | null>(null)
  let subscription: Subscription | undefined
  watch(
    () => document.value,
    updatedDoc => {
      if (updatedDoc) {
        const collection = updatedDoc.collection
        updatedDoc.$.subscribe(async (val: GenericDocument) => {
          const table = plugin?.tables.value[collection.name]
          result.value = documentLabel(val, collection, table)
        })
      } else {
        subscription?.unsubscribe()
      }
    },
    { immediate: true }
  )
  return result
}

export const newDocumentFactory = (
  collection: GenericRxCollection
): GenericRxDocument => {
  const newDoc = collection.newDocument()
  newDoc[collection.schema.primaryPath] = uuid()
  return newDoc
}

export const useNewDocumentFactory = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collection: Ref<GenericRxCollection | any>
): {
  next: () => GenericRxDocument
  newDoc: Ref<GenericRxDocument>
} => {
  const newDoc = ref() as Ref<GenericRxDocument>
  onMounted(() => {
    newDoc.value = newDocumentFactory(collection.value)
  })
  return {
    next: (): GenericRxDocument => {
      newDoc.value = newDocumentFactory(collection.value)
      return newDoc.value
    },
    newDoc
  }
}
