import { Container, Content } from 'rsuite'
import { FunctionComponent, ReactNode } from 'react'
import { useToggle } from 'react-use'

import { ProfileStatusMenu } from '@platyplus/profile'

import Header from '../header/header'
import SideMenu from '../side-menu/side-menu'
import { MenuItem } from '../types'
import { Logo } from '../logo/logo'
import './layout.module.less'

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
