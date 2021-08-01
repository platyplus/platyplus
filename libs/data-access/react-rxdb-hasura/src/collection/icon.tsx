import type { IconProps } from 'rsuite'

import { PropType } from '@platyplus/ts-types'

import { useCollectionTableConfig } from './config'

export const useTableIcon = (id: string) =>
  useCollectionTableConfig<PropType<IconProps, 'icon'>>(id, 'icon', 'table')
