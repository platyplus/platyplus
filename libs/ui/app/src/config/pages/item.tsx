import { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { List } from 'rsuite'

import { TableInformation, tableName } from '@platyplus/rxdb-hasura'
import { useCollectionTitle } from '@platyplus/react-rxdb-hasura'

export const ConfigPageItem: React.FC<{
  tableinfo: TableInformation
  index: number
}> = ({ tableinfo, index }) => {
  const name = useMemo(() => tableName(tableinfo), [tableinfo])
  const history = useHistory()
  const { config } = useCollectionTitle(tableinfo)
  const title = config !== name ? `${config} (${name})` : name
  return (
    <List.Item
      index={index}
      style={{
        cursor: 'pointer'
      }}
      onClick={() => {
        history.push(`/config/collections/${tableinfo.id}`)
      }}
    >
      <span>{title}</span>
    </List.Item>
  )
}
