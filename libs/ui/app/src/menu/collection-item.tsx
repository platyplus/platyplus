import { IconProps } from 'rsuite'
import { MenuItem } from '@platyplus/layout'
import { PropType } from '@platyplus/ts-types'
import {
  useTableInfo,
  useCollectionTitle,
  useTableIcon
} from '@platyplus/react-rxdb-hasura'
import { canRead } from '@platyplus/rxdb-hasura'
import { useMemo } from 'react'

export const CollectionMenuItem: React.FC<{
  id: string
  role: string
  name?: string
  icon?: PropType<IconProps, 'icon'>
}> = ({ id, role, name, icon }) => {
  const tableInfo = useTableInfo(id)
  const { title } = useCollectionTitle(tableInfo)
  const { state: configIcon } = useTableIcon(id)

  const allowed = useMemo(
    () => tableInfo && canRead(tableInfo, role),
    [tableInfo, role]
  )
  if (allowed)
    return (
      <MenuItem
        href={`/collections/${role}/${id}`}
        title={name || title}
        icon={icon || configIcon}
      />
    )
  else return null
}
