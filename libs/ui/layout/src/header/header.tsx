import './header.module.less'
import { Header as GenericHeader, Icon, IconButton } from 'rsuite'
import { FunctionComponent, ReactNode } from 'react'

import StatusMenu from '../status-menu/status-menu'
import { useTitleState } from '../title'

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
      <div className="container">
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
      </div>
    </GenericHeader>
  )
}

export default Header
