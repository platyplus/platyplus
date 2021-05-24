import { FunctionComponent } from 'react'
import { ItemProps } from '../types'
import {
  ButtonToolbar,
  Icon,
  IconButton,
  IconButtonProps,
  Tooltip,
  Whisper
} from 'rsuite'

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
  <ButtonToolbar>{props.children}</ButtonToolbar>
)

export default StatusMenu
