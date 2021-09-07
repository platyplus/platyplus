import type { IconProps } from 'rsuite'

import { PropType } from '@platyplus/ts-types'
import { useTableConfig } from '../config'

export const useTableIcon = (id: string) =>
  useTableConfig<PropType<IconProps, 'icon'>>(id, 'icon', 'table')
