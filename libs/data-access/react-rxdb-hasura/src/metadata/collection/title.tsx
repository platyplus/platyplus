import { ContentsCollection, metadataName } from '@platyplus/rxdb-hasura'
import { InlineValue } from '@platyplus/layout'
import { useCollectionTableConfig } from '../hooks'

// * Collection title e.g. 'Visit'. config.title="Visits" whereas config.document_title="Visite"
export const useCollectionTitle = (collection: ContentsCollection) =>
  useCollectionTableConfig(collection, 'title', (metadata) =>
    metadataName(metadata)
  )

export const CollectionTitle: React.FC<{
  collection: ContentsCollection
}> = ({ collection }) => {
  const [value, onChange] = useCollectionTitle(collection)
  return <InlineValue value={value} onChange={onChange} />
}
