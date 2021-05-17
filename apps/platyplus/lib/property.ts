import {
  ArrayElement,
  ContentsCollection,
  ContentsDocument,
  Metadata
} from '@platyplus/rxdb-hasura'
import equal from 'deep-equal'
import { useEffect, useState } from 'react'
import { useObservable } from 'react-use'
import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'
import { Subscription } from 'rxjs'
import { v4 as uuid } from 'uuid'

import { newDocumentFactory } from './document'

export const useRefFieldValue = <T>(
  document: ContentsDocument,
  name: string
): Readonly<T> => {
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
      (rel) => rel.rel_name === unref(name)
    )?.mapping[0].remote_column_name as string
  })
  let subscription: Subscription | undefined
  watch(
    () =>
      (store.getters['rxdb/getField'](document.value, unref(name)) ||
        document.value?.get(unref(name))) as string | string[] | null,
    async (newVal) => {
      if (typeof newVal === 'string') {
        // * object relationship
        subscription = refCollection.value
          .findOne({ selector: { [refKey.value]: newVal } })
          .$.subscribe(toObserver(fieldValue))
      } else if (Array.isArray(newVal)) {
        // * array relationship
        subscription = refCollection.value
          .find({ selector: { id: { $in: newVal } } }) // ! TODO inverted remote_column_name, can't use refKey.value
          .$.subscribe((idMap) => {
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

/**
 * * Return a document ref corresponding to the `name` relationship in the initial documentRef
 * * If the relationship does not exist, create a temporary document and set it to the vuex forms
 * * -> it allows for instance to read/edit the patient details while editing/creating a `visit { patient { name } }`
 * @param documentRef
 * @param name
 */
// TODO make it work with array relationships
// ? Permissions?
export const useEmbeddedRefFieldValue = (
  documentRef: ContentsDocument,
  name: string
): Readonly<ContentsDocument | undefined> => {
  const existingRef = useRefFieldValue<ContentsDocument>(documentRef, name)
  const fieldValue = ref<ContentsDocument | undefined>()
  const store = useStore()
  const metadataRef = useDocumentMetadata(documentRef)
  watch(
    [existingRef, documentRef, metadataRef],
    ([existing, document, metadata]) => {
      if (document && metadata) {
        const {
          remote_column_name,
          remoteTable
        } = (metadata.relationships.find(
          (rel) => rel.rel_name === unref(name)
        ) as ArrayElement<Metadata['relationships']>).mapping[0]
        if (existing === null) {
          const collectionName = `${document.collection.role}_${remoteTable?.table_schema}_${remoteTable?.table_name}`
          const configCollection = document.collection.database[collectionName]
          const storeContents: Record<string, ContentsDocument> =
            store.getters['rxdb/getCollection'](configCollection) || {}
          const refIdColumn = remote_column_name as string
          // * Get the id back from the forms, or use a default uuid
          const id =
            Object.entries(storeContents).find(
              ([, doc]) => doc[refIdColumn] === document.primary
            )?.[0] || uuid()
          // * Create a temporary document
          fieldValue.value = newDocumentFactory(configCollection, id)
          // * Store the table id in the new config document
          store.commit('rxdb/setField', {
            document: fieldValue.value,
            field: refIdColumn,
            value: document.primary
          })
          // * Store the table config id in the table document
          store.commit('rxdb/setField', {
            document: document,
            field: unref(name),
            value: document.primary
          })
        } else {
          fieldValue.value = existingRef.value
        }
      }
    },
    { immediate: true }
  )
  return fieldValue
}

// * Reactive value of a document property
export const usePropertyValue = <T>(
  document: ContentsDocument,
  name: string
): Readonly<T | undefined> => useObservable(document.get$(name))

// * Reactive value of a form property
export const useFieldValue = <T>(
  document: ContentsDocument,
  name: string
): Readonly<T | undefined> => {
  const fieldValue = usePropertyValue<T>(document, name)
  const store = useStore()

  return computed(
    () =>
      (store.getters['rxdb/getField'](document.value, unref(name)) as T) ??
      fieldValue.value
  )
}

export const useProperty = (
  document: ContentsDocument,
  name: string
): TopLevelProperty | PrimaryProperty =>
  document.value.collection.schema.jsonSchema.properties[name]

export const useFormProperty = <T>(
  document: ContentsDocument,
  name: string
): {
  model: T | undefined
  changed: boolean
  title: string
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
