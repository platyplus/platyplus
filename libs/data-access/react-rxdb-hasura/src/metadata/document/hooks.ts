import { useEffect, useState } from 'react'

import {
  ContentsCollection,
  ContentsDocument,
  Metadata
} from '@platyplus/rxdb-hasura'
import { useCollectionMetadata } from '../collection'

export const useDocumentMetadata = (
  document?: ContentsDocument
): Readonly<Metadata | undefined> =>
  useCollectionMetadata(document?.collection as ContentsCollection)

export const useDocumentComponentName = (
  document: ContentsDocument,
  field?: string
) => {
  const metadata = useDocumentMetadata(document)
  const [componentName, setComponentName] = useState(document?.component(field))
  useEffect(() => {
    document && setComponentName(document.component(field))
  }, [document, metadata, field])
  return componentName
}
