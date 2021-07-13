import { useCallback } from 'react'
import { ContentsCollection, metadataName } from '@platyplus/rxdb-hasura'
import { InlineEditableValue } from '../../helpers'
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
        (state.getConfig<string>(metadata, 'title') || metadataName(metadata)),
      [metadata]
    )
  )
  const setTitle = useConfigStore(
    (state) => (newTitle: string) =>
      state.setConfig(metadata, newTitle, 'title')
  )
  return [title, setTitle]
}

export const CollectionTitle: React.FC<{
  collection: ContentsCollection
}> = ({ collection }) => {
  const state = useCollectionTitle(collection)
  return <InlineEditableValue state={state} />
}
