import { Header as GenericHeader, Icon, IconButton, Portal } from 'rsuite'
import React, { FunctionComponent, ReactNode, useEffect, useRef } from 'react'

import StatusMenu from '../status-menu/status-menu'
import styled from 'styled-components'
import { createGlobalState, useTitle } from 'react-use'
import { useNavigate } from 'react-router-dom'

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

const Header: FunctionComponent<{
  statusMenu?: ReactNode
  toggle?: () => void
  collapsed?: boolean
  sideMenu?: boolean
}> = ({ toggle, statusMenu, sideMenu }) => {
  const [, setContainer] = useTitleContainer()
  const ref = useRef()
  useEffect(() => {
    setContainer(ref.current)
  }, [setContainer, ref])

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
          <span ref={ref} style={{ width: '100%' }} />
        </div>
        <StatusMenu>{statusMenu}</StatusMenu>
      </Container>
    </GenericHeader>
  )
}

export const HeaderTitleWrapper: React.FC<{
  title?: string
  component?: React.ReactNode
  previous?: boolean | string
}> = ({ title, component: Component, children, previous }) => {
  useTitle(title)
  const [container] = useTitleContainer()
  const navigate = useNavigate()
  const PreviousButton = previous ? (
    <IconButton
      appearance="subtle"
      onClick={() =>
        typeof previous === 'boolean' ? navigate(-1) : navigate(previous)
      }
      size="lg"
      icon={<Icon icon="page-previous" />}
    />
  ) : null
  return (
    <>
      <Portal container={() => container}>
        {PreviousButton}
        <span style={{ marginLeft: '10px' }}>{Component || title}</span>
      </Portal>
      {children}
    </>
  )
}

export default Header
