import create from 'zustand'
import * as immutable from 'object-path-immutable'
import deepEqual from 'deep-equal'

import {
  castValue,
  ContentsCollection,
  ContentsDocument,
  Metadata,
  MetadataDocument
} from '@platyplus/rxdb-hasura'
import { useDocumentProperties } from '@platyplus/react-rxdb-hasura'
import { RxCollection } from 'rxdb'
import { useCollectionPropertyConfig } from './property/hooks'
import { useEffect, useState } from 'react'
import { useCollectionMetadata } from './hooks'

export const useConfigStore = create<{
  forms: Record<string, Metadata>
  setPropertyTitle: (
    metadata: Metadata,
    property: string,
    value: string
  ) => void
  //   setForm: (
  //     document: ContentsDocument,
  //     values: Record<string, string | boolean>
  //   ) => void
  //   resetForm: (document: ContentsDocument) => void
}>((set) => ({
  forms: {},
  setPropertyTitle: (metadata, property, title) =>
    set((state) => {
      const index = metadata.propertiesConfig.findIndex(
        ({ property_name }) => property_name === property
      )
      if (index < 0) {
        return immutable.push(state, `forms.${metadata.id}.propertiesConfig`, {
          component: null,
          description: null,
          icon: null,
          property_name: property,
          title
        })
      } else {
        return immutable.set(
          state,
          `forms.${metadata.id}.propertiesConfig.${index}.title`,
          title
        )
      }
    })
  //   setForm: (document, values) =>
  //     set((state) => {
  //       const newValues = Object.entries(values).reduce(
  //         (aggregator, [key, value]) => {
  //           aggregator[key] = castValue(document, key, value)
  //           return aggregator
  //         },
  //         {}
  //       )
  //       return immutable.set(
  //         state,
  //         ['forms', document.collection.name, document.primary],
  //         newValues
  //       )
  //     }),
  //   resetForm: (document) =>
  //     set((state) =>
  //       immutable.del(state, [
  //         'forms',
  //         document.collection.name,
  //         document.primary
  //       ])
  //     )
}))

/**
 * Get the form values of a given document
 * @param document
 * @returns
 */
// const useFormValues = (document?: ContentsDocument) =>
//   useConfigStore(
//     (state) =>
//       (document && state.forms[document.collection.name]?.[document.primary]) ||
//       {}
//   )

/**
 * Get the values of every property of the form,
 * and fall back to the value of the document if not yet present in the form
 * @param document
 * @returns
 */
// export const useGetForm = <T extends Record<string, unknown>>(
//   document: ContentsDocument
// ) => {
//   const form = useFormValues(document)
//   const properties = useDocumentProperties(document)
//   return useConfigStore<T>((state) => {
//     if (!properties) return {}
//     return [...properties.keys()].reduce<any>((aggregator, key) => {
//       aggregator[key] =
//         (form[key] !== undefined ? form[key] : document[key]) ?? null
//       return aggregator
//     }, {})
//   })
// }

// export const useSetForm = (document: ContentsDocument) =>
//   useConfigStore(
//     (state) => (values: Record<string, string | boolean>) =>
//       state.setForm(document, values)
//   )

/**
 * Resets the form linked to the given document
 * @param document
 * @returns
 */
// export const useResetForm = (document: ContentsDocument) =>
//   useConfigStore((state) => () => state.resetForm(document))

/**
 * Tracks changes in the form linked to the given document
 * @param document
 * @returns
 */
// export const useFormChanged = (document?: ContentsDocument) => {
//   const formValues = useFormValues(document)
//   const properties = useDocumentProperties(document)
//   return (
//     properties &&
//     [...properties.keys()].some(
//       (key) =>
//         formValues[key] !== undefined &&
//         (typeof document[key] === 'object'
//           ? !deepEqual(document[key], formValues[key])
//           : document[key] !== formValues[key])
//     )
//   )
// }

// export const useFormSave = (document?: ContentsDocument) => {
//   const changed = useFormChanged(document)
//   const formValues = useFormValues(document)
//   const reset = useResetForm(document)
//   return async () => {
//     if (changed) {
//       if (document._isTemporary) {
//         // TODO
//         console.log('TODO NEW DOC')
//       }
//       await document.atomicPatch(formValues)
//       reset()
//     }
//   }
// }
