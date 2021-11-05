import { List } from 'rsuite'
import { useHistory } from 'react-router-dom'

import { CollectionComponent } from './types'
import { DocumentLabel } from '@platyplus/react-rxdb-hasura'

export const ListCollection: CollectionComponent = ({
  tableinfo,
  role,
  data
}) => {
  const history = useHistory()
  return (
    <List hover bordered>
      {data.map((item, index) => (
        <List.Item
          key={index}
          index={index}
          style={{
            cursor: 'pointer'
          }}
          onClick={() => {
            history.push(`/collections/${role}/${tableinfo.id}/${item.id}`)
          }}
        >
          <DocumentLabel tableinfo={tableinfo} role={role} document={item} />
        </List.Item>
      ))}
    </List>
  )
}
