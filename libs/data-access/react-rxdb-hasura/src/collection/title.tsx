import { useMemo } from 'react'

import { ContentsCollection, metadataName } from '@platyplus/rxdb-hasura'
import { InlineValue } from '@platyplus/layout'

import { useCollectionTableConfig } from './config'

// * Collection title e.g. 'Visit'. config.title="Visits" whereas config.document_title="Visite"
export const useCollectionTitle = (collection: ContentsCollection) => {
  const name = useMemo(
    () => collection && metadataName(collection?.metadata),
    [collection]
  )
  return useCollectionTableConfig(collection, 'title', name)
}

export const CollectionTitle: React.FC<{
  collection: ContentsCollection
  editable?: boolean
}> = ({ collection, editable }) => {
  const [value, onChange] = useCollectionTitle(collection)
  return <InlineValue editable={editable} value={value} onChange={onChange} />
}
