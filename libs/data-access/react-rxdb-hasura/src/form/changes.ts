import deepEqual from 'deep-equal'
import { useMemo } from 'react'

import { Contents, Metadata } from '@platyplus/rxdb-hasura'

import { useFormRawValues } from './state'
import { useMetadataProperties } from '../property'

export const useFormHasChanged = (
  metadata: Metadata,
  role: string,
  document: Contents
) => {
  const [properties] = useMetadataProperties(metadata)
  const formValues = useFormRawValues(metadata, role, document)

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
