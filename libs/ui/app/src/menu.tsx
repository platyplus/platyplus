import React, { useMemo } from 'react'
import { Divider, IconProps } from 'rsuite'

import {
  useTableIcon,
  useCollectionTitle,
  useTableInfo,
  useIsTableInfoReady,
  useAppConfig,
  useTablesConfig,
  usePage
} from '@platyplus/react-rxdb-hasura'

import { MenuItem } from '@platyplus/layout'
import { canRead, MenuItem as MenuItemType } from '@platyplus/rxdb-hasura'
import { useUserRoles } from '@platyplus/hbp'

import { RouteConfig } from './types'
import { PropType } from '@platyplus/ts-types'

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

export const CollectionMenuItem: React.FC<{
  id: string
  role: string
  name?: string
  icon?: PropType<IconProps, 'icon'>
}> = ({ id, role, name, icon }) => {
  const tableInfo = useTableInfo(id)
  const [configTitle] = useCollectionTitle(tableInfo)
  const [configIcon] = useTableIcon(id)
  return (
    <MenuItem
      href={`/collection/${role}/${id}`}
      title={name || configTitle}
      icon={icon || configIcon}
    />
  )
}

export const PageMenuItem: React.FC<{
  id: string
  role: string
  name?: string
  icon?: PropType<IconProps, 'icon'>
}> = ({ id, name, icon }) => {
  const page = usePage(id)
  if (page)
    return (
      <MenuItem
        href={`/pages/${id}`}
        title={name || page.title}
        icon={(icon || page.icon) as PropType<IconProps, 'icon'>}
      />
    )
  else return null
}

const HomeItem: React.FC<{ title?: string; enabled?: boolean }> = ({
  enabled,
  title
}) => enabled && <MenuItem icon="home" title={title} href="/" />

export const PrivateMenu: React.FC<{
  home: { enabled?: boolean; title?: string }
  config: boolean
}> = ({ home, config }) => {
  const roles = useUserRoles(false)
  const [appConfig] = useAppConfig()

  const tablesInfo = useTablesConfig()

  // TODO return MenuItem instead
  const tables = useMemo<[string, Partial<MenuItemType>[]][]>(
    () =>
      roles.map((role) => [
        role,
        (
          appConfig.menu ||
          tablesInfo.map<Partial<MenuItemType>>((table) => ({
            type: 'table',
            id: table.id
          }))
        ).filter((item) => {
          if (item.type === 'table') {
            const table = tablesInfo.find((ti) => ti.id === item.id)
            return table && canRead(table, role)
          } else return true
        })
      ]),
    [roles, appConfig, tablesInfo]
  )

  // TODO separator between roles, and role headers (if more than one role)

  return (
    <>
      <HomeItem {...home} />
      {tables.map(([role, tables]) =>
        tables.map((item, index) => {
          if (item.type === 'table')
            return (
              <CollectionMenuItem
                key={`${index}.${item.id}.${role}`}
                id={item.id}
                name={item.name}
                icon={item.icon as PropType<IconProps, 'icon'>}
                role={role}
              />
            )
          else if (item.type === 'page')
            return (
              <PageMenuItem
                key={`${index}.${item.id}.${role}`}
                id={item.id}
                icon={item.icon as PropType<IconProps, 'icon'>}
                role={role}
                name={item.name}
              />
            )
          else return null
        })
      )}
      {config && (
        <>
          <Divider />
          <MenuItem href="/config" title="Configuration" icon="wrench" />
          <MenuItem href="/config/collections" title="Collections" level={1} />
          <MenuItem href="/config/pages" title="Pages" level={1} />
          <MenuItem href="/config/menu" title="Menu" level={1} />
        </>
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
