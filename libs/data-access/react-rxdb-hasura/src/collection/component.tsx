import { ContentsCollection } from '@platyplus/rxdb-hasura'

import { useCollectionTableConfig } from './config'

export const useCollectionComponentName = (collection: ContentsCollection) =>
  useCollectionTableConfig(collection, 'component', 'default')
