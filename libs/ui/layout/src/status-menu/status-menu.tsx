import React, { FunctionComponent } from 'react'
import { Tooltip } from 'antd'
import { Col, Row } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'

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

const StyledCol = styled(Col)`
  margin: 0 24px;
  > * {
    display: inline;
    padding-left: 12px;
  }
`

export const StatusMenu: FunctionComponent = (props) => (
  <StyledCol>{props.children}</StyledCol>
)

export default StatusMenu
