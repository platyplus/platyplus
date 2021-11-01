import { Icon } from 'rsuite'
import { IconNames } from 'rsuite/lib/Icon'
import { SVGIcon } from 'rsuite/lib/@types/common'
import styled from 'styled-components'
import './logo.less'
import { Link } from 'react-router-dom'
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
  font-size: ${({ theme }) => theme.logo.fontSize};
  height: ${({ theme }) => theme.headerHeight};
`

const DivIconLogo = styled(DivLogo)`
  padding-left: calc(${({ theme }) => theme.logo.fontSize} + 2px);
  padding-top: calc(
    (
        ${({ theme }) => theme.headerHeight} -
          ${({ theme }) => theme.logo.fontSize}
      ) / 2 - 2px
  );
`

const DivImageLogo = styled(DivLogo)`
  padding-left: calc(${({ theme }) => theme.logo.fontSize} - 2px);
  padding-top: calc(
    (
        ${({ theme }) => theme.headerHeight} -
          ${({ theme }) => theme.logo.fontSize}
      ) / 2 - 6px
  );
`

const ImageLogo = styled.img`
  height: calc(${({ theme }) => theme.headerHeight} / 2 + 4px);
  width: calc(${({ theme }) => theme.headerHeight} / 2 + 4px);
`

export const Logo: React.FC<{
  icon?: IconNames | SVGIcon
  image?: string
  title?: string
  to?: string
}> = ({ icon, image, title = 'Platyplus', to = '/' }) => {
  return (
    <Link to={to}>
      {icon ? (
        <DivIconLogo className="logo">
          <Icon icon={icon} size="lg" style={{ verticalAlign: 0 }} />
          <span style={{ marginLeft: 12 }}> {title}</span>
        </DivIconLogo>
      ) : (
        <DivImageLogo className="logo">
          <ImageLogo src={image || '/assets/logo.png'} />
          <span style={{ marginLeft: 12 }}> {title}</span>
        </DivImageLogo>
      )}
    </Link>
  )
}

export default Logo
