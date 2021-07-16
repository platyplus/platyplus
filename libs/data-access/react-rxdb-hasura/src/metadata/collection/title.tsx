import { useCallback } from 'react'
import { ContentsCollection, metadataName } from '@platyplus/rxdb-hasura'
import { InlineValue } from '@platyplus/layout'
import { useConfigStore } from '../store'
import { useCollectionMetadata } from './hooks'

// * Collection title e.g. 'Visit'. config.title="Visits" whereas config.document_title="Visite"
export const useCollectionTitle = (
  collection: ContentsCollection
): [string, (val: string) => void] => {
  const metadata = useCollectionMetadata(collection)
  const title = useConfigStore(
    useCallback(
      (state) =>
        metadata &&
        (state.getTable<string>(metadata, 'title') || metadataName(metadata)),
      [metadata]
    )
  )
  const setTitle = useConfigStore(
    (state) => (newTitle: string) => state.setTable(metadata, newTitle, 'title')
  )
  return [title, setTitle]
}

export const CollectionTitle: React.FC<{
  collection: ContentsCollection
}> = ({ collection }) => {
  const [value, onChange] = useCollectionTitle(collection)
  return <InlineValue value={value} onChange={onChange} />
}
