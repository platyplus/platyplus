import { useEffect, useMemo, useState } from 'react'
import { useRxDocument } from 'rxdb-hooks'

import {
  Contents,
  ContentsDocument,
  populateDocument,
  TableInformation
} from '@platyplus/rxdb-hasura'

import { useCollection, useCollectionName } from '../collection'

export const useDocument = <B extends boolean = false>(
  tableInfo: TableInformation,
  role: string,
  id: string,
  populate?: B
): {
  document: B extends true ? Contents : ContentsDocument
  isFetching: boolean
} => {
  type ResultType = B extends true ? Contents : ContentsDocument
  const collectionName = useCollectionName(tableInfo, role)
  const collection = useCollection(collectionName)
  const queryConstructor = useMemo(() => id !== 'new' && id, [id])
  const { result, isFetching: isDocumentFetching } =
    useRxDocument<ContentsDocument>(collectionName, queryConstructor)
  const [document, setDocument] = useState<ResultType>()
  useEffect(() => {
    if (id === 'new') setDocument(collection?.newDocument() as ContentsDocument)
    else if (result) {
      const subscription = result.$.subscribe(async () => {
        if (populate) {
          setPopulating(true)
          const populated = await populateDocument(result)
          setDocument(populated as ResultType)
        } else {
          setDocument(result)
        }
        setPopulating(false)
      })
      return () => subscription.unsubscribe()
    }
  }, [id, result, collection, populate])

  const [isPopulating, setPopulating] = useState(true)

  const isFetching = useMemo(() => {
    if (id === 'new') return !document
    else return document ? isDocumentFetching || isPopulating : true
  }, [id, document, isDocumentFetching, isPopulating])

  return { document, isFetching }
}
