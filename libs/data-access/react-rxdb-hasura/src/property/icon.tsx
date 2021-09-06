import type { IconProps } from 'rsuite'

import { TableInformation } from '@platyplus/rxdb-hasura'
import { PropType } from '@platyplus/ts-types'

import { useCollectionPropertyConfig } from './hooks'

export const usePropertyIcon = (
  tableInfo: TableInformation,
  property: string
) =>
  useCollectionPropertyConfig<PropType<IconProps, 'icon'>>(
    tableInfo,
    property,
    'icon'
  )
