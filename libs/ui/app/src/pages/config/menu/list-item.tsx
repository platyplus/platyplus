import { List } from 'rsuite'

import { MenuItem as MenuItemType } from '@platyplus/rxdb-hasura'
import { useCollectionTitle, useTableInfo } from '@platyplus/react-rxdb-hasura'

export const MenuListItem: React.FC<{
  data: MenuItemType
  index: number
  onClick?: (e: Event) => void
}> = ({ data, index, onClick }) => {
  const id = data.type === 'table' ? data.id : null
  const tableInfo = useTableInfo(id)
  const [configTitle] = useCollectionTitle(tableInfo)

  const title = data.name || configTitle || data.id

  return (
    <List.Item
      index={index}
      style={{
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      {title}
    </List.Item>
  )
}
