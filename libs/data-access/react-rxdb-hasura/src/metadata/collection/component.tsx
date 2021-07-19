import { ContentsCollection } from '@platyplus/rxdb-hasura'
import { useCollectionTableConfig } from '../hooks'

export const useCollectionComponentName = (collection: ContentsCollection) =>
  useCollectionTableConfig(collection, 'component', 'default')
