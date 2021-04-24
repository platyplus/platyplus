import { ReactNode } from 'react'
import { useToggle } from 'react-use'
import { Layout as AntLayout } from 'antd'
import './layout.module.less'
import Header from '../header/header'

const { Content, Sider } = AntLayout
export type LayoutProps = {
  menu?: ReactNode
  children?: ReactNode
}

export const Layout = ({ menu, children }: LayoutProps) => {
  const [collapsed, toggle] = useToggle(true)
  return (
    <AntLayout id="app">
      {menu && (
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
          {menu}
        </Sider>
      )}
      <AntLayout className="site-layout">
        <Header menu={menu} collapsed={collapsed} toggle={toggle} />
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
