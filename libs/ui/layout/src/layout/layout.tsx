import './layout.module.less'

import { Container, Content } from 'rsuite'
import { FunctionComponent, ReactNode } from 'react'

import Header from '../header/header'
import SideMenu, { SideMenuItem } from '../side-menu/side-menu'
import { useToggle } from 'react-use'

export const Layout: FunctionComponent<{
  logo?: ReactNode
  sideMenu?: SideMenuItem[]
  statusMenu?: ReactNode
}> = ({ logo, sideMenu, statusMenu, children }) => {
  const [collapsed, toggle] = useToggle(false)
  const hasSideMenu = sideMenu && !!sideMenu.length
  return (
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
        <Content className="page">{children}</Content>
      </Container>
    </Container>
  )
}

export default Layout
