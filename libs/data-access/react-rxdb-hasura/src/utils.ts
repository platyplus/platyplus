import {
  computeTemplate,
  Contents,
  TableInformation
} from '@platyplus/rxdb-hasura'
import { useMemo } from 'react'
import { useRxData } from 'rxdb-hooks'
import { useContentsCollection } from '.'
import { useDocumentLabelTemplate } from './document'

export const useOptions = (table: TableInformation, role?: string) => {
  const collection = useContentsCollection(table, role)
  const { result } = useRxData<Contents>(collection?.name, (collection) =>
    collection.find()
  )

  const [template] = useDocumentLabelTemplate(table, role)
  const options = useMemo(
    () =>
      result
        .map((doc) => ({
          label: computeTemplate(doc, template),
          value: doc.id
        }))
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    [result, template]
  )
  return options
}
