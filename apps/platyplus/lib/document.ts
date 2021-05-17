import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

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

// * Returns the document with the given id, or a new temporary document otherwise
export const useDocument = (
  collection?: ContentsCollection,
  id?: string
): ContentsDocument | undefined => {
  const [document, setDocument] = useState<ContentsDocument>()
  useEffect(() => {
    if (collection && id) {
      const subscription = collection
        .findOne(id)
        .$.subscribe((value: ContentsDocument) => setDocument(value))
      return () => subscription.unsubscribe()
    } else {
      if (!document) {
        setDocument(newDocumentFactory(collection))
      }
    }
  }, [collection, id, document])
  return document
}

// ? Useless in React?
/*
export const useDocumentMetadata = (
  document?: ContentsDocument
): Readonly<Metadata | undefined> => {
  const [value, setValue] = useState<Metadata>()
  useEffect(() => {
    setValue(document?.collection.metadata)
  }, [document])
  return value
}
*/
