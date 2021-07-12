import { Header as GenericHeader, Icon, IconButton, Portal } from 'rsuite'
import React, { FunctionComponent, ReactNode, useState } from 'react'

import StatusMenu from '../status-menu/status-menu'
import { useTitleState } from '../title'
import styled from 'styled-components'
import { createGlobalState } from 'react-use'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  height: ${({ theme }) => theme.headerHeight};
  vertical-align: bottom;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
export const useTitleContainer = createGlobalState<HTMLElement>()
export const Header: FunctionComponent<{
  statusMenu?: ReactNode
  toggle?: () => void
  collapsed?: boolean
  sideMenu?: boolean
}> = ({ toggle, statusMenu, sideMenu }) => {
  const [, setContainer] = useTitleContainer()
  return (
    <GenericHeader>
      {/* // TODO https://github.com/nfl/react-helmet */}
      {/* <Head>
        <title>{title}</title>
      </Head> */}
      <Container>
        <div>
          {sideMenu && (
            <IconButton
              appearance="subtle"
              placement="left"
              onClick={toggle}
              size="lg"
              icon={<Icon icon="align-justify" />}
            />
          )}
          <span ref={(ref) => setContainer(ref)}></span>
        </div>
        <StatusMenu>{statusMenu}</StatusMenu>
      </Container>
    </GenericHeader>
  )
}

export const HeaderTitleWrapper: React.FC<{
  title: React.ComponentType
}> = ({ title: Title, children }) => {
  const [container] = useTitleContainer()
  return (
    <>
      <Portal container={() => container}>
        <Title />
      </Portal>
      {children}
    </>
  )
}

export default Header
