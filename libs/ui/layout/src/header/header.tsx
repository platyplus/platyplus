import React, { FunctionComponent, ReactNode } from 'react'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Title, useTitleState } from '../title/title'
import { SettingOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { Row, Col } from 'antd'
import Link from 'next/link'
import StatusMenu from '../status-menu/status-menu'

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
  sideMenu?: ReactNode
  statusMenu?: ReactNode
  toggle?: () => void
  collapsed?: boolean
}> = (props) => {
  const [title] = useTitleState()
  if (props.sideMenu || title)
    return (
      <Layout.Header {...headerProps}>
        <Row justify="space-between">
          <Col>
            {props.sideMenu &&
              React.createElement(
                props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: props.toggle
                }
              )}
            <Title />
          </Col>
          <StatusMenu>{props.statusMenu}</StatusMenu>
        </Row>
      </Layout.Header>
    )
  else return null
}

export default Header
