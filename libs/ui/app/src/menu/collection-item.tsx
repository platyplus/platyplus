import { IconProps } from 'rsuite'
import { MenuItem } from '@platyplus/layout'
import { PropType } from '@platyplus/ts-types'
import {
  useTableInfo,
  useCollectionTitle,
  useTableIcon
} from '@platyplus/react-rxdb-hasura'

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
