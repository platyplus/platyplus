import './header.module.less'

import { Header as GenericHeader, Icon, IconButton } from 'rsuite'
import { FunctionComponent, ReactNode } from 'react'
import { createGlobalState, useTitle } from 'react-use'

import Head from 'next/head'
import { useEffect } from 'react'
import StatusMenu from '../status-menu/status-menu'

export const useTitleState = createGlobalState<string>('')

export const usePageTitle = (title: string) => {
  useTitle(title)
  const [titleState, setTitleState] = useTitleState()
  useEffect(() => {
    setTitleState(title)
  })
  return [titleState, setTitleState]
}
export const Header: FunctionComponent<{
  statusMenu?: ReactNode
  toggle?: () => void
  collapsed?: boolean
  sideMenu?: boolean
}> = ({ toggle, statusMenu, sideMenu }) => {
  const [title] = useTitleState()
  return (
    <GenericHeader>
      <Head>
        <title>{title}</title>
      </Head>
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
          <div>{title}</div>
        </div>
        <StatusMenu>{statusMenu}</StatusMenu>
      </div>
    </GenericHeader>
  )
}

export default Header
