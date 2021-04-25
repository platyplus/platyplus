import React, { FunctionComponent, ReactNode } from 'react'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Title, useTitleState } from '../title/title'
import { SettingOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { Row, Col } from 'antd'
import Link from 'next/link'

const headerProps = {
  className: 'site-layout-background',
  style: { padding: 0 }
}

const iconStyle = { fontSize: '18px', color: ' #08c' }
const HeaderItem: FunctionComponent<{
  icon: React.ElementType
  title: string
  href: string
}> = ({ icon, title, href }) => (
  <Link href={href}>
    <Tooltip title={title}>
      {React.createElement(icon, { style: iconStyle })}
    </Tooltip>
  </Link>
)

const toolBarStyle = {
  margin: '0 24px',
  padding: '0 8px'
}

export const Header: FunctionComponent<{
  menu?: ReactNode
  toggle?: () => void
  collapsed?: boolean
}> = (props) => {
  const [title] = useTitleState()
  if (props.menu)
    return (
      <Layout.Header {...headerProps}>
        <Row justify="space-between">
          <Col>
            {React.createElement(
              props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: props.toggle
              }
            )}
            <Title />
          </Col>
          <Col style={toolBarStyle}>
            <HeaderItem
              icon={SettingOutlined}
              title="Settings"
              href="/settings"
            />
          </Col>
        </Row>
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
