import type { IconProps } from 'rsuite'
import { Contents } from '@platyplus/rxdb-hasura'
import { PropType } from '@platyplus/ts-types'
import { useCollectionPropertyConfig } from './hooks'
import { RxCollection } from 'rxdb'

export const usePropertyIcon = (
  collection: RxCollection<Contents>,
  property: string
) =>
  useCollectionPropertyConfig<PropType<IconProps, 'icon'>>(
    collection,
    property,
    'icon'
  )
