import { ContentsDocument, Metadata } from '@platyplus/rxdb-hasura'

import { useCollectionMetadata } from '../collection'
import { useDocument } from './hooks'

// TODO unclear names!!!
export const useDocumentMetadata = (
  document?: ContentsDocument
): Readonly<Metadata | undefined> => useCollectionMetadata(document?.collection)

export const useMetadataDocument = (role: string, id: string) =>
  useDocument<Metadata>(`${role}_metadata`, id)
