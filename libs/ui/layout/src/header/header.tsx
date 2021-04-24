import React, { ReactNode } from 'react'
import { Layout } from 'antd'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import './header.module.less'
import { Title, useTitleState } from '../title/title'

export type HeaderProps = {
  menu?: ReactNode
  toggle?: () => void
  collapsed?: boolean
}

const headerProps = {
  className: 'site-layout-background',
  style: { padding: 0 }
}

export function Header(props: HeaderProps) {
  const [title] = useTitleState()
  if (props.menu)
    return (
      <Layout.Header {...headerProps}>
        {React.createElement(
          props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: props.toggle
          }
        )}
        <Title />
      </Layout.Header>
    )
  else if (title)
    return (
      <Layout.Header {...headerProps}>
        <Title />
      </Layout.Header>
    )
  else return null
}

export default Header
