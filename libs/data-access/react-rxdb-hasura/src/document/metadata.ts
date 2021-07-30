import { ContentsDocument, Metadata } from '@platyplus/rxdb-hasura'

import { useCollectionMetadata } from '../collection'

// TODO unclear names!!!
export const useDocumentMetadata = (
  document?: ContentsDocument
): Readonly<Metadata | undefined> => useCollectionMetadata(document?.collection)
