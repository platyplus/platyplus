import deepEqual from 'deep-equal'
import { useMemo } from 'react'

import { ContentsDocument } from '@platyplus/rxdb-hasura'

import { useDocumentProperties } from '..'

import { useFormRawValues } from './state'

export const useFormHasChanged = (document: ContentsDocument) => {
  const [properties] = useDocumentProperties(document)
  const formValues = useFormRawValues(document)

  return useMemo(
    () =>
      properties &&
      [...properties.keys()].some((key) => {
        if (formValues[key] === undefined) {
          return false
        } else {
          if (!document[key] && !formValues[key]) return false
          else
            return typeof document[key] === 'object'
              ? !deepEqual(document[key], formValues[key])
              : document[key] !== formValues[key]
        }
      }),
    [document, formValues, properties]
  )
}
