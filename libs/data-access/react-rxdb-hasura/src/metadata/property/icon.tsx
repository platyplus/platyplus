import type { IconProps } from 'rsuite'
import { ContentsCollection } from '@platyplus/rxdb-hasura'
import { PropType } from '@platyplus/ts-types'
import { useCollectionPropertyConfig } from './hooks'

export const usePropertyIcon = (
  collection: ContentsCollection,
  property: string
) =>
  useCollectionPropertyConfig<PropType<IconProps, 'icon'>>(
    collection,
    property,
    'icon'
  )
