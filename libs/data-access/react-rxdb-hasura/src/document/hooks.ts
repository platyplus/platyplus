import { useEffect, useMemo, useState } from 'react'
import { useRxDocument } from 'rxdb-hooks'

import { ContentsDocument, TableInformation } from '@platyplus/rxdb-hasura'

import { useContentsCollection } from '../collection/hooks'

// TODO probably remove this, as it is only used in 'Pages'
export const useDocument = (
  tableInfo: TableInformation,
  role: string,
  id: string
): {
  document: ContentsDocument
  isFetching: boolean
} => {
  const collection = useContentsCollection(tableInfo, role)
  const queryConstructor = useMemo(() => id !== 'new' && id, [id])
  const { result, isFetching: isDocumentFetching } =
    useRxDocument<ContentsDocument>(collection?.name, queryConstructor)
  const [document, setDocument] = useState<ContentsDocument>()
  useEffect(() => {
    if (id === 'new') setDocument(collection?.newDocument())
    else if (result) {
      const subscription = result.$.subscribe(async () => {
        setDocument(result as ContentsDocument)
      })
      return () => subscription.unsubscribe()
    }
  }, [id, result, collection])

  const isFetching = useMemo(() => {
    if (id === 'new') return !document
    else return document ? isDocumentFetching : true
  }, [id, document, isDocumentFetching])

  return { document, isFetching }
}
