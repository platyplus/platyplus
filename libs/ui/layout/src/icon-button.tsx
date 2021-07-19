import { Icon, IconButton, IconButtonProps, Popover, Whisper } from 'rsuite'
import { SVGIcon } from 'rsuite/lib/@types/common'
import { IconNames, IconProps } from 'rsuite/lib/Icon'

export const IconButtonWithHelper: React.FC<
  Omit<IconButtonProps, 'icon'> & {
    icon: IconNames | SVGIcon
    helper: string
    iconProps?: Omit<IconProps, 'icon'>
  }
> = ({ icon, helper, iconProps, ...props }) => {
  return (
    <Whisper
      placement="bottom"
      trigger="hover"
      speaker={<Popover>{helper}</Popover>}
      delay={300}
    >
      <IconButton icon={<Icon icon={icon} {...iconProps} />} {...props} />
    </Whisper>
  )
}
