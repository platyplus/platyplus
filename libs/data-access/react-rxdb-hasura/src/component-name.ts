import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'
import { useEffect, useState } from 'react'
import { useCollectionMetadata, useDocumentMetadata } from './metadata'

export const useCollectionComponentName = (collection: ContentsCollection) => {
  const metadata = useCollectionMetadata(collection)
  const [componentName, setComponentName] = useState(collection.component())
  useEffect(() => {
    setComponentName(collection.component())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata])
  return componentName
}

export const useDocumentComponentName = (
  document: ContentsDocument,
  field?: string
) => {
  const metadata = useDocumentMetadata(document)
  const [componentName, setComponentName] = useState(document.component(field))
  useEffect(() => {
    setComponentName(document.component(field))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata])
  return componentName
}
