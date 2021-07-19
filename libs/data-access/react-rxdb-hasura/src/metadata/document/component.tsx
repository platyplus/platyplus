import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { useCollectionTableConfig } from '../hooks'

export const useDocumentComponentName = (document: ContentsDocument) =>
  useCollectionTableConfig(
    document?.collection,
    'document_component',
    'default'
  )
