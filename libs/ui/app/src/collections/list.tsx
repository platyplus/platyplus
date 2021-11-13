import { List } from 'rsuite'
import { useNavigate } from 'react-router-dom'

import { CollectionComponent } from './types'
import { DocumentLabel } from '@platyplus/react-rxdb-hasura'

export const ListCollection: CollectionComponent = ({
  tableinfo,
  role,
  data
}) => {
  const navigate = useNavigate()
  return (
    <List hover bordered>
      {data.map((item, index) => (
        <List.Item
          key={index}
          index={index}
          style={{
            cursor: 'pointer'
          }}
          onClick={() =>
            navigate(`/collections/${role}/${tableinfo.id}/${item.id}`)
          }
        >
          <DocumentLabel tableinfo={tableinfo} role={role} document={item} />
        </List.Item>
      ))}
    </List>
  )
}
