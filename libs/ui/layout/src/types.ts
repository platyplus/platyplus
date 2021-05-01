import { PropType } from '@platyplus/ts-types'
import { IconProps } from 'rsuite'

export type ItemProps = {
  icon: PropType<IconProps, 'icon'>
  title: string
  href?: string
}
