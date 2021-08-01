import { useEffect, useMemo, useState } from 'react'
import { useRxDocument } from 'rxdb-hooks'

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
  const collection = useContentsCollection(collectionName)
  const queryConstructor = useMemo(() => id !== 'new' && id, [id])
  const { result, isFetching: isDocumentFetching } = useRxDocument<Contents>(
    collectionName,
    queryConstructor
  )
  const [document, setDocument] = useState<Contents>()
  useEffect(() => {
    if (id === 'new') setDocument(collection?.newDocument())
    else if (result) {
      const populate = async () => {
        setPopulating(true)
        const populated = await populateDocument(result as ContentsDocument)
        setDocument(populated)
        setPopulating(false)
        // console.log('Population ok', populated)
      }
      const subscription = result.$.subscribe(() => populate())
      return () => subscription.unsubscribe()
    }
  }, [id, result, collection])

  const [isPopulating, setPopulating] = useState(true)

  const isFetching = useMemo(() => {
    if (id === 'new') return !document
    else return document ? isDocumentFetching || isPopulating : true
  }, [id, document, isDocumentFetching, isPopulating])

  return { document, isFetching }
}
