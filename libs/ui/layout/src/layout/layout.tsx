import { Container, Content } from 'rsuite'
import { FunctionComponent, ReactNode } from 'react'
import { useToggle } from 'react-use'
import styled, { ThemeProvider } from 'styled-components'

import { ProfileStatusMenu } from '@platyplus/profile'

import Header from '../header/header'
import SideMenu from '../side-menu/side-menu'
import { MenuItem } from '../types'
import { Logo } from '../logo/logo'

const theme = {
  headerHeight: '48px',
  logo: {
    fontSize: '16px'
  }
}

const StyledContent = styled(Content)`
  padding: 10px;
`
export const Layout: FunctionComponent<{
  logo?: ReactNode
  sideMenu?: MenuItem[]
  statusMenu?: ReactNode
}> = ({
  logo = <Logo />,
  sideMenu,
  statusMenu = <ProfileStatusMenu />,
  children
}) => {
  const [collapsed, toggle] = useToggle(false)
  const hasSideMenu = sideMenu && !!sideMenu.length
  return (
    <ThemeProvider theme={theme}>
      <Container className="app">
        {hasSideMenu && (
          <SideMenu
            logo={logo}
            menu={sideMenu}
            toggle={toggle}
            collapsed={collapsed}
          />
        )}
        <Container>
          <Header
            statusMenu={statusMenu}
            collapsed={collapsed}
            toggle={toggle}
            sideMenu={hasSideMenu}
          />
          <StyledContent>{children}</StyledContent>
        </Container>
      </Container>
    </ThemeProvider>
  )
}

export default Layout
