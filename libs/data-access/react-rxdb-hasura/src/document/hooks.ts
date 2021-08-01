import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRxData, useRxDocument } from 'rxdb-hooks'

import {
  Contents,
  ContentsDocument,
  Metadata,
  populateDocument
} from '@platyplus/rxdb-hasura'

import { useCollectionName, useContentsCollection } from '../collection'

export const usePopulatedDocument = (
  metadata: Metadata,
  role: string,
  id: string
) => {
  const collectionName = useCollectionName(metadata, role)
  const doc = useRxDocument<ContentsDocument>(collectionName, id)
  const [state, setState] = useState<Contents>(null)
  const [isPopulating, setPopulating] = useState(true)

  useEffect(() => {
    if (!doc.isFetching && doc.result) {
      const populate = async () => {
        setPopulating(true)
        const populated = await populateDocument(doc.result as ContentsDocument)
        setState(populated)
        setPopulating(false)
        // console.log('Population ok', populated)
      }
      const subscription = doc.result.$.subscribe(() => populate())
      return () => subscription.unsubscribe()
    }
  }, [doc.result, doc.isFetching])

  const isFetching = useMemo(
    () => doc.isFetching || isPopulating,
    [doc.isFetching, isPopulating]
  )
  return { document: state, isFetching }
}

// TODO review
export const useDocument = <T = ContentsDocument>(
  metadata: Metadata,
  role: string,
  id: string
) => {
  const collectionName = useCollectionName(metadata, role)
  const collection = useContentsCollection(collectionName)
  const queryConstructor = useMemo(() => id !== 'new' && id, [id])
  const { result, isFetching: isDocumentFetching } = useRxDocument(
    collectionName,
    queryConstructor
  )
  const [document, setDocument] = useState<T>()
  useEffect(() => {
    if (id === 'new') setDocument(collection?.newDocument() as T)
    else if (result) setDocument(result as T)
  }, [id, result, collection])
  const isFetching = useMemo(() => {
    if (id === 'new') return !document
    else return document ? isDocumentFetching : true
  }, [id, document, isDocumentFetching])
  return { isFetching, document }
}
