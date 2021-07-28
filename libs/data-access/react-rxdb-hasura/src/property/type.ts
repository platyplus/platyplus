import { useMemo } from 'react'

import { ContentsDocument, propertyType } from '@platyplus/rxdb-hasura'

export const usePropertyType = (document: ContentsDocument, field?: string) => {
  const result = useMemo(
    () => document && field && propertyType(document, field),
    [document, field]
  )
  return result
}
