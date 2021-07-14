import React, { FunctionComponent } from 'react'
import { Sidenav, Nav, Navbar, Icon, Sidebar } from 'rsuite'

const NavToggle = ({ collapsed, onChange }) => {
  return (
    <Navbar appearance="subtle">
      <Navbar.Body>
        <Nav pullRight>
          <Nav.Item
            onClick={onChange}
            style={{ width: 56, textAlign: 'center' }}
          >
            <Icon icon={collapsed ? 'angle-right' : 'angle-left'} />
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  )
}

export const SideMenu: FunctionComponent<{
  logo?: React.ReactNode
  toggle?: () => void
  collapsed?: boolean
}> = ({ logo, collapsed, toggle, children }) => {
  return (
    <Sidebar
      style={{ display: 'flex', flexDirection: 'column' }}
      width={collapsed ? 56 : 260}
      collapsible
    >
      <Sidenav expanded={!collapsed} appearance="subtle">
        {logo && <Sidenav.Header>{logo}</Sidenav.Header>}
        <Sidenav.Body>
          <Nav>{children}</Nav>
        </Sidenav.Body>
      </Sidenav>
      <NavToggle collapsed={collapsed} onChange={toggle} />
    </Sidebar>
  )
}

export default SideMenu
