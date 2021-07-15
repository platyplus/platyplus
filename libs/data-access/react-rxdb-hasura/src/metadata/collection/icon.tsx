import { useCallback } from 'react'
import { IconProps } from 'rsuite'
import { ContentsCollection } from '@platyplus/rxdb-hasura'
import { PropType } from '@platyplus/ts-types'
import { useConfigStore } from '../store'
import { useCollectionMetadata } from './hooks'

type IconType = PropType<IconProps, 'icon'>

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
