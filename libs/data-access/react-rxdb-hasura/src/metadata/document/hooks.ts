import { useEffect, useState } from 'react'

import {
  ContentsCollection,
  ContentsDocument,
  Metadata
} from '@platyplus/rxdb-hasura'
import { useCollectionMetadata } from '../collection'

// TODO generate label on the fly, not when document is created/updated in RcDB
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
