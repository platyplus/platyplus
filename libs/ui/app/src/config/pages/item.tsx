import { useNavigate } from 'react-router-dom'
import { List } from 'rsuite'

import { TableInformation, tableName } from '@platyplus/rxdb-hasura'
import { useFullCollectionTitle } from '@platyplus/react-rxdb-hasura'

export const ConfigPageItem: React.FC<{
  tableinfo: TableInformation
  index: number
}> = ({ tableinfo, index }) => {
  const navigate = useNavigate()
  const { title } = useFullCollectionTitle(tableinfo)

  return (
    <List.Item
      index={index}
      style={{
        cursor: 'pointer'
      }}
      onClick={() => navigate(`/config/collections/${tableinfo.id}`)}
    >
      <span>{title}</span>
    </List.Item>
  )
}
