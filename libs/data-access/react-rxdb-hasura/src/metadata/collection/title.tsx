import { ContentsCollection, metadataName } from '@platyplus/rxdb-hasura'
import { InlineEditableValue } from '../../helpers'
import { useCollectionMetadata } from './hooks'

// * Collection title e.g. 'Visit'. config.title="Visits" whereas config.document_title="Visite"
const useCollectionTitle = (
  collection: ContentsCollection
): [string, (val: string) => void] => {
  const metadata = useCollectionMetadata(collection)
  const setTitle = (newTitle: string) => {
    // TODO
    console.log('TODO', newTitle)
  }
  const title = metadata
    ? metadata.config?.title || metadataName(metadata)
    : collection?.name
  return [title, setTitle]
}

// TODO make it editable
export const CollectionTitle: React.FC<{
  collection: ContentsCollection
}> = ({ collection }) => {
  const state = useCollectionTitle(collection)
  return <InlineEditableValue state={state} />
}
