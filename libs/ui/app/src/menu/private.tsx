import React, { useMemo } from 'react'
import { IconProps } from 'rsuite'

import { useAppConfig, useTablesConfig } from '@platyplus/react-rxdb-hasura'

import { canRead, MenuItem as MenuItemType } from '@platyplus/rxdb-hasura'
import { useUserRoles } from '@platyplus/hbp'

import { PropType } from '@platyplus/ts-types'
import { CollectionMenuItem } from './collection-item'
import { ConfigMenu } from './config'
import { PageMenuItem } from './page-item'

export const PrivateMenu: React.FC<{
  home: { enabled?: boolean; title?: string }
  config: boolean
}> = ({ home, config }) => {
  const roles = useUserRoles(false)
  const { state, isFetching } = useAppConfig()

  const tablesInfo = useTablesConfig()

  const items = useMemo<[string, Partial<MenuItemType>[]][]>(
    () =>
      roles.map((role) => [
        role,
        (
          state.menu ||
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
    [roles, state.menu, tablesInfo]
  )
  // TODO separator between roles, and role headers (if more than one role)
  if (isFetching) return null
  return (
    <>
      {items.map(([role, tables]) =>
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
      {config && <ConfigMenu />}
    </>
  )
}
