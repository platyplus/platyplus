import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { useCollectionPropertyConfig } from './hooks'

export const usePropertyComponentName = (
  document: ContentsDocument,
  field?: string
) =>
  useCollectionPropertyConfig(
    document?.collection,
    field,
    'component',
    'default'
  )
