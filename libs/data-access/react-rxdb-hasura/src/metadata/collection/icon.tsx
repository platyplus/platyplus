import { IconProps } from 'rsuite'
import { ContentsCollection } from '@platyplus/rxdb-hasura'
import { PropType } from '@platyplus/ts-types'
import { useCollectionTableConfig } from '../hooks'

export const useCollectionIcon = (collection: ContentsCollection) =>
  useCollectionTableConfig<PropType<IconProps, 'icon'>>(
    collection,
    'icon',
    'table'
  )
