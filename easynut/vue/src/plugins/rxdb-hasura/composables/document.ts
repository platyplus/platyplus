import Handlebars from 'handlebars'
import { v4 as uuid } from 'uuid'
import { computed, ComputedRef, inject, onMounted, Ref, ref } from 'vue'

import { DefaultRxDBKey, RxDBHasuraPlugin } from '../plugin'
import {
  GenericDocument,
  GenericRxCollection,
  GenericRxDocument
} from '../types'

export const useDocumentLabel = (
  document: Ref<GenericRxDocument>
): ComputedRef<string | null> => {
  const plugin = inject<RxDBHasuraPlugin<unknown>>(DefaultRxDBKey)
  const doc = ref<GenericDocument>()
  return computed(() => {
    if (document.value) {
      // ? cannot use useSubscription -> not unrerigstered on unmount. Problem?
      document.value.$.subscribe(async (newValue: GenericDocument) => {
        doc.value = newValue
      })
      const template =
        plugin?.tables.value[document.value.collection.name].config?.label ||
        '{{id}}'
      const compiledTemplate = Handlebars.compile(template, { noEscape: true })
      return compiledTemplate(
        // props.document?.toJSON ? props.document.toJSON() : props.document
        doc.value
      )
    } else return null
  })
}

export const newDocumentFactory = (
  collection: GenericRxCollection
): GenericRxDocument => {
  const newDoc = collection.newDocument()
  newDoc[collection.schema.primaryPath] = uuid()
  return newDoc
}

export const useNewDocumentFactory = (
  collection: Ref<GenericRxCollection>
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
