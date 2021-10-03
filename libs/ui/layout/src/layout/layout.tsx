import { Container, Content } from 'rsuite'
import { ReactNode } from 'react'
import { useToggle } from 'react-use'
import styled, { ThemeProvider } from 'styled-components'

import Header from '../header/header'
import SideMenu from '../side-menu/side-menu'
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
export const Layout: React.FC<{
  logo?: ReactNode
  menu?: ReactNode
  statusMenu?: ReactNode
}> = ({ logo = <Logo />, menu, statusMenu, children }) => {
  const [collapsed, toggle] = useToggle(false)
  const hasSideMenu = !!menu
  return (
    <ThemeProvider theme={theme}>
      <Container className="app">
        {hasSideMenu && (
          <SideMenu logo={logo} toggle={toggle} collapsed={collapsed}>
            {menu}
          </SideMenu>
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
