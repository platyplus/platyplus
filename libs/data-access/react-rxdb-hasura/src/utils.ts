import {
  computeTemplate,
  Contents,
  TableInformation
} from '@platyplus/rxdb-hasura'
import { useMemo } from 'react'
import { useDocumentLabelTemplate } from './document'

export const useOptions = (
  table: TableInformation,
  data: Contents[],
  role?: string
) => {
  const [template] = useDocumentLabelTemplate(table, role)
  const options = useMemo(
    () =>
      data
        .map((doc) => ({
          label: computeTemplate(doc, template),
          value: doc.id
        }))
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    [data, template]
  )
  return options
}
