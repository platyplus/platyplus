import deepEqual from 'deep-equal'
import { useMemo } from 'react'

import {
  ContentsDocument,
  TableInformation,
  tableProperties
} from '@platyplus/rxdb-hasura'

import { useFormRawValues } from './state'

export const useFormHasChanged = (
  tableInfo: TableInformation,
  role: string,
  document: ContentsDocument
) => {
  const properties = tableProperties(tableInfo)
  const formValues = useFormRawValues(tableInfo, role, document)

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
