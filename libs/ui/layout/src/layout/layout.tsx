import { FunctionComponent, ReactNode } from 'react'
import { useToggle } from 'react-use'
import { Layout as AntLayout } from 'antd'
import './layout.module.less'
import Header from '../header/header'

const { Content, Sider } = AntLayout

export const Layout: FunctionComponent<{
  sideMenu?: ReactNode
  statusMenu?: ReactNode
}> = ({ sideMenu, statusMenu, children }) => {
  const [collapsed, toggle] = useToggle(true)
  return (
    <AntLayout id="app">
      {sideMenu && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          // collapsedWidth="0"
          onCollapse={(value, type) => {
            // if (value && !collapsed) toggle()
            toggle()
            console.log('onCollapse', collapsed, type)
          }}
        >
          <div className="logo" />
          {sideMenu}
        </Sider>
      )}
      <AntLayout className="site-layout">
        <Header
          sideMenu={sideMenu}
          statusMenu={statusMenu}
          collapsed={collapsed}
          toggle={toggle}
        />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  )
}

export default Layout
