import { Icon } from 'rsuite'
import { IconNames } from 'rsuite/lib/Icon'
import { SVGIcon } from 'rsuite/lib/@types/common'
import styled from 'styled-components'

/*
@font-size: 16px;
@padding: calc((@header-height - @font-size) / 2 - 2px);
.logo {
  padding-left: @font-size + 2px;
  padding-top: @padding;
  font-size: @font-size;
  height: @header-height;
  background: #34c3ff;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
}
*/
const DivLogo = styled.div`
  padding-left: calc(${({ theme }) => theme.logo.fontSize} + 2px);
  padding-top: calc(
    (
        ${({ theme }) => theme.headerHeight} -
          ${({ theme }) => theme.logo.fontSize}
      ) / 2 - 2px
  );
  font-size: ${({ theme }) => theme.logo.fontSize};
  height: ${({ theme }) => theme.headerHeight};
  background: #34c3ff;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
`

export const Logo: React.FC<{
  icon?: IconNames | SVGIcon
  title?: string
}> = ({ icon = 'logo-analytics', title = 'My app' }) => {
  return (
    <DivLogo>
      <Icon icon={icon} size="lg" style={{ verticalAlign: 0 }} />
      <span style={{ marginLeft: 12 }}> {title}</span>
    </DivLogo>
  )
}

export default Logo
