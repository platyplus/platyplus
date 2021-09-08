import React, { useMemo } from 'react'
import { Icon, Nav } from 'rsuite'
import { useHistory, useLocation } from 'react-router-dom'

import {
  useTableIcon,
  useCollectionTitle,
  useTableInfo,
  useIsTableInfoReady,
  sortTableInfo,
  useAppConfig,
  useTablesConfig
} from '@platyplus/react-rxdb-hasura'
import { MenuItem } from '@platyplus/layout'
import { canRead, TableInformation } from '@platyplus/rxdb-hasura'
import { useUserRoles } from '@platyplus/hbp'

import { RouteConfig } from './types'

export const Menu: React.FC<{
  config: boolean
  authenticated: boolean
  home: RouteConfig
  register: RouteConfig
  login: RouteConfig
}> = ({ config, authenticated, home, register, login }) => {
  const ready = useIsTableInfoReady()
  return authenticated && ready ? (
    <PrivateMenu config={config} home={home} />
  ) : (
    <PublicMenu home={home} register={register} login={login} />
  )
}

export const CollectionMenuItem: React.FC<{ id: string; role: string }> = ({
  id,
  role
}) => {
  const tableInfo = useTableInfo(id)
  const [title] = useCollectionTitle(tableInfo)
  const [icon] = useTableIcon(id)
  const location = useLocation()
  const history = useHistory()
  const href = `/collection/${role}/${id}`
  return (
    <Nav.Item
      onSelect={() => {
        history.push(href)
      }}
      eventKey={href}
      active={location.pathname === href}
      icon={<Icon icon={icon} />}
    >
      {title}
    </Nav.Item>
  )
}

const HomeItem: React.FC<{ title?: string; enabled?: boolean }> = ({
  enabled,
  title
}) => enabled && <MenuItem icon="home" title={title} href="/" />

export const PrivateMenu: React.FC<{
  home: { enabled?: boolean; title?: string }
  config: boolean
}> = ({ home, config }) => {
  const includeMissing = true
  const roles = useUserRoles(false)
  const [appConfig] = useAppConfig()

  const tablesInfo = useTablesConfig()

  const tables = useMemo<[string, TableInformation[]][]>(() => {
    const order = appConfig.menu_order || []
    return roles.map((role) => [
      role,
      tablesInfo
        .filter(
          (table) =>
            canRead(table, role) && (includeMissing || order.includes(table.id))
        )
        .sort(sortTableInfo(order))
    ])
  }, [roles, includeMissing, appConfig, tablesInfo])

  // TODO separator between roles, and role headers (if more than one role)

  return (
    <>
      <HomeItem {...home} />
      {tables.map(([role, tables]) =>
        tables.map((tableInfo) => (
          <CollectionMenuItem
            key={`${tableInfo.id}.${role}`}
            id={tableInfo.id}
            role={role}
          />
        ))
      )}
      {config && (
        <MenuItem icon="wrench" title="Configuration" href="/config" />
      )}
    </>
  )
}

// * 'System' side menu e.g. login, register, home page...
export const PublicMenu: React.FC<
  Record<'home' | 'login' | 'register', { enabled?: boolean; title?: string }>
> = ({ home, login, register }) => (
  <>
    <HomeItem {...home} />
    {login.enabled && (
      <MenuItem icon="sign-in" title={login.title} href="/login" />
    )}
    {register.enabled && (
      <MenuItem icon="user-plus" title={register.title} href="/register" />
    )}
  </>
)
