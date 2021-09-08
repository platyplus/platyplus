import { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { List } from 'rsuite'

import { TableInformation, tableName } from '@platyplus/rxdb-hasura'
import { useCollectionTitle } from '@platyplus/react-rxdb-hasura'

export const ConfigListItem: React.FC<{
  tableInfo: TableInformation
  index: number
}> = ({ tableInfo, index }) => {
  const name = useMemo(() => tableName(tableInfo), [tableInfo])
  const history = useHistory()
  const [configTitle] = useCollectionTitle(tableInfo)
  const title = configTitle !== name ? `${configTitle} (${name})` : name
  return (
    <List.Item
      index={index}
      style={{
        cursor: 'pointer'
      }}
      onClick={() => {
        history.push(`/config/${tableInfo.id}`)
      }}
    >
      <span>{title}</span>
    </List.Item>
  )
}
