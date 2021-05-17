import type { PropType, XOR } from '@platyplus/ts-types'
import { IconProps } from 'rsuite'

export type Icon = PropType<IconProps, 'icon'>

export type ItemProps = {
  icon: Icon
  title: string
  href?: string
}
export type MenuItem = ItemProps &
  XOR<
    {
      children: Array<ItemProps & { href: string }>
    },
    {
      href: string
    }
  >
