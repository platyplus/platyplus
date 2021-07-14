import { useCallback } from 'react'
import { ContentsCollection } from '@platyplus/rxdb-hasura'
import { IconType } from '@platyplus/layout'
import { useConfigStore } from '../store'
import { useCollectionMetadata } from './hooks'

export const useCollectionIcon = (
  collection: ContentsCollection
): [IconType, (val: IconType) => void] => {
  const metadata = useCollectionMetadata(collection)
  const icon = useConfigStore(
    useCallback(
      (state) =>
        (metadata && state.getTable<IconType>(metadata, 'icon')) || 'table',
      [metadata]
    )
  )
  const setIcon = useConfigStore(
    (state) => (newIcon: IconType) => state.setTable(metadata, newIcon, 'icon')
  )
  return [icon, setIcon]
}

// TODO editable CollectionIcon component
