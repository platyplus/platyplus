import React, { FunctionComponent } from 'react'
import { Tooltip } from 'antd'
import { Col } from 'antd'
import Link from 'next/link'

const iconStyle = { fontSize: '18px', color: ' #08c' }

export const StatusMenuItem: FunctionComponent<{
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

const menuBarStyle = {
  margin: '0 24px',
  padding: '0 8px'
}

export const StatusMenu: FunctionComponent = (props) => (
  <Col style={menuBarStyle}>{props.children}</Col>
)

export default StatusMenu
