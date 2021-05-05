import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { ItemProps } from '../types'
import {
  ButtonToolbar,
  Icon,
  IconButton,
  IconButtonProps,
  Tooltip,
  Whisper
} from 'rsuite'
import { TypeAttributes } from 'rsuite/lib/@types/common'

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

const StyledButtonToolbar = styled(ButtonToolbar)`
  margin-top: 12px;
  margin-right: 24px;
`

export const StatusMenu: FunctionComponent = (props) => (
  <StyledButtonToolbar>{props.children}</StyledButtonToolbar>
)

export default StatusMenu
