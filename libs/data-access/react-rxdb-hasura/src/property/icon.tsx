import type { IconProps } from 'rsuite'

import { Metadata } from '@platyplus/rxdb-hasura'
import { PropType } from '@platyplus/ts-types'

import { useCollectionPropertyConfig } from './hooks'

export const usePropertyIcon = (metadata: Metadata, property: string) =>
  useCollectionPropertyConfig<PropType<IconProps, 'icon'>>(
    metadata,
    property,
    'icon'
  )
