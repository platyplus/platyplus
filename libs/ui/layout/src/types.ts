import type { PropType } from '@platyplus/ts-types'
import { IconProps } from 'rsuite'

export type IconType = PropType<IconProps, 'icon'>

export type ItemProps = {
  icon: IconType
  title: string
  href?: string
}
