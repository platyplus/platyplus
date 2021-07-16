import { useCallback, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useRxData } from 'rxdb-hooks'

import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { useContentsCollection } from './collection'

export const useDocument = (name: string, id: string) => {
  const collection = useContentsCollection(name)
  const queryConstructor = useCallback(
    (collection) => id !== 'new' && collection.findOne(id),
    [id]
  )

  const data = useRxData<ContentsDocument>(name, queryConstructor)
  const [newId] = useState(uuid())

  const document = useMemo(() => {
    if (id === 'new') {
      if (collection) {
        const newDoc = collection.newDocument()
        newDoc[collection.schema.primaryPath] = newId
        return newDoc
      }
    } else return data.result[0]
  }, [data, collection, id, newId])

  const isFetching = useMemo(() => {
    if (id === 'new') return !document
    else return document ? data.isFetching : true
  }, [id, document, data])
  return { isFetching, document }
}

export const useDocuments = (name: string, ids: string[] = []) => {
  const queryConstructor = useCallback(
    (collection) =>
      // TODO findByIds
      collection.find().where('id').in(ids),
    [ids]
  )
  const data = useRxData<ContentsDocument>(name, queryConstructor)
  return data
}
