import { PropType } from '@platyplus/ts-types'
import { FunctionComponent } from 'react'
import {
  ButtonToolbar,
  Icon,
  IconButton,
  IconButtonProps,
  IconProps,
  Tooltip,
  Whisper
} from 'rsuite'

type ItemProps = {
  icon: PropType<IconProps, 'icon'>
  title: string
  href?: string
}

export const StatusMenuItem: FunctionComponent<
  ItemProps & Omit<IconButtonProps, 'icon'>
> = ({ icon, title, href, ...iconButtonProps }) => (
  <Whisper
    placement="bottom"
    trigger="hover"
    speaker={<Tooltip>{title}</Tooltip>}
  >
    <IconButton
      icon={<Icon icon={icon} />}
      circle
      href={href}
      {...iconButtonProps}
    />
  </Whisper>
)

export const StatusMenu: FunctionComponent = (props) => (
  <ButtonToolbar style={{ paddingRight: '7px' }}>
    {props.children}
  </ButtonToolbar>
)

export default StatusMenu
