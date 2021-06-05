import { Header as GenericHeader, Icon, IconButton } from 'rsuite'
import { FunctionComponent, ReactNode } from 'react'

import StatusMenu from '../status-menu/status-menu'
import { useTitleState } from '../title'
import styled from 'styled-components'

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
export const Header: FunctionComponent<{
  statusMenu?: ReactNode
  toggle?: () => void
  collapsed?: boolean
  sideMenu?: boolean
}> = ({ toggle, statusMenu, sideMenu }) => {
  const [title] = useTitleState()
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
          <span> {title}</span>
        </div>
        <StatusMenu>{statusMenu}</StatusMenu>
      </Container>
    </GenericHeader>
  )
}

export default Header
