import { Icon } from 'rsuite'
import { IconNames } from 'rsuite/lib/Icon'
import { SVGIcon } from 'rsuite/lib/@types/common'

export const Logo: React.FC<{
  icon?: IconNames | SVGIcon
  title?: string
}> = ({ icon = 'logo-analytics', title = 'My app' }) => {
  return (
    <div className="logo">
      <Icon icon={icon} size="lg" style={{ verticalAlign: 0 }} />
      <span style={{ marginLeft: 12 }}> {title}</span>
    </div>
  )
}

export default Logo
