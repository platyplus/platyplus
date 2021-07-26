import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRxData } from 'rxdb-hooks'

import { Contents, ContentsDocument } from '@platyplus/rxdb-hasura'

import { useContentsCollection } from './collection'

export const useDocument = (name: string, id: string) => {
  const collection = useContentsCollection(name)
  const queryConstructor = useCallback(
    (collection) => id !== 'new' && collection.findOne(id),
    [id]
  )
  const { result, isFetching: isDocumentFetching } = useRxData<Contents>(
    name,
    queryConstructor
  )
  const [document, setDocument] = useState<ContentsDocument>()
  useEffect(
    () =>
      setDocument((result[0] || collection?.newDocument()) as ContentsDocument),
    [result, collection]
  )
  const isFetching = useMemo(() => {
    if (id === 'new') return !document
    else return document ? isDocumentFetching : true
  }, [id, document, isDocumentFetching])
  return { isFetching, document }
}

export const useDocuments = (name: string, ids: string[] = []) => {
  const queryConstructor = useCallback(
    (collection) => collection.find().where('id').in(ids),
    [ids]
  )
  const data = useRxData<Contents>(name, queryConstructor)
  return data
}
