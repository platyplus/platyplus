import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useRxData } from 'rxdb-hooks'

import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { useDocumentMetadata } from './metadata'

export const useDocumentLabel = (
  document?: ContentsDocument
): Readonly<string | null> => {
  const [result, setResult] = useState(null)
  useEffect(() => {
    if (document) {
      const subscription = document
        .get$('label')
        .subscribe((value: string) => setResult(value))
      return () => subscription.unsubscribe()
    }
  }, [document])
  return result
}

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
  // onMounted(() => {
  //   newDoc.value = newDocumentFactory(collection)
  // })
  return {
    next: (): ContentsDocument => {
      setNewDoc(newDocumentFactory(collection))
      return newDoc
    },
    newDoc
  }
}
/*
// TODO Returns the document with the given id, or a new temporary document otherwise
type UseDocumentResult = {
  document: ContentsDocument
  isFetching: boolean
}
export const useDocument = (name: string, id: string) => {
  const collection = useContentsCollection(name)
  const [state, setState] = useState<UseDocumentResult>({
    document: null,
    isFetching: true
  })

  const query = useMemo(() => collection?.findOne(id), [collection, id])
  useEffect(() => {
    if (collection && name && id) {
      // TODO problem: if nothing found, we can't know if nothing is loaded yet (ongoing replication) or if the id is incorrect
      // TODO -> check replication state?
      const subscription = query.$.subscribe((value) =>
        setState({ document: value, isFetching: !value })
      )
      return () => subscription.unsubscribe()
    } else {
      // if (!document) {
      // setDocument(newDocumentFactory(collection))
      // }
    }
  }, [collection, name, id, query])
  return state
}
*/
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

export const useDocumentTitle = (document: ContentsDocument) => {
  const metadata = useDocumentMetadata(document)
  return metadata.config?.title
}
