import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useRxData } from 'rxdb-hooks'

import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'

// TODO move to rxdb-hasura
export const newDocumentFactory = (
  collection: ContentsCollection,
  id = uuid()
): ContentsDocument => {
  const newDoc = collection.newDocument()
  newDoc[collection.schema.primaryPath] = id
  return newDoc
}

// TODO reactify
export const useNewDocumentFactory = (
  collection: ContentsCollection
): {
  next: () => ContentsDocument
  newDoc: ContentsDocument
} => {
  const [newDoc, setNewDoc] = useState<ContentsDocument>()
  return {
    next: (): ContentsDocument => {
      setNewDoc(newDocumentFactory(collection))
      return newDoc
    },
    newDoc
  }
}

export const useDocument = (name: string, id: string) => {
  // ? useMemo ?
  const data = useRxData<ContentsDocument>(name, (collection) =>
    collection.findOne(id)
  )
  const document = data.result[0]
  return { ...data, isFetching: document ? data.isFetching : true, document }
}

export const useDocuments = (name: string, ids: string[] = []) => {
  // ? useMemo ?
  const data = useRxData<ContentsDocument>(name, (collection) =>
    // TODO findByIds
    collection.find().where('id').in(ids)
  )
  return data
}
