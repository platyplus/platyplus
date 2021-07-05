import { List } from 'rsuite'
import { Link } from 'react-router-dom'

import { CollectionComponent } from './types'

const ListCollection: CollectionComponent = ({ collection, data }) => {
  return (
    <List>
      {data.map((item, index) => (
        <List.Item key={index} index={index}>
          <Link to={`/collection/${collection.name}/${item.id}`}>
            {item.label}
          </Link>
        </List.Item>
      ))}
    </List>
  )
}

export default ListCollection
