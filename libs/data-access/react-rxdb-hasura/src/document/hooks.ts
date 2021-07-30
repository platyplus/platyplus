import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRxData, useRxDocument } from 'rxdb-hooks'

import { Contents, ContentsDocument } from '@platyplus/rxdb-hasura'

import { useContentsCollection } from '../collection'

export const useDocument = <T = ContentsDocument>(name: string, id: string) => {
  const collection = useContentsCollection(name)
  const queryConstructor = useMemo(() => id !== 'new' && id, [id])
  const { result, isFetching: isDocumentFetching } = useRxDocument(
    name,
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

export const useDocuments = (name: string, ids: string[] = []) => {
  const queryConstructor = useCallback(
    (collection) => collection.find().where('id').in(ids),
    [ids]
  )
  const data = useRxData<Contents>(name, queryConstructor)
  return data
}

export const useWatchDocumentValue = (document: ContentsDocument) => {
  const [value, setValue] = useState<Contents>(document?.toJSON())
  useEffect(() => {
    if (document) {
      const subscription = document.$.subscribe((newValue) =>
        setValue(newValue)
      )
      return () => subscription.unsubscribe()
    }
  }, [document])
  return value
}
