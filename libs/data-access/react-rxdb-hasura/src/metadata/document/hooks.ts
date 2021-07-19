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
