import React from 'react'
import { Icon, Nav } from 'rsuite'
import { useHistory, useLocation } from 'react-router-dom'

import {
  useCollectionIcon,
  useCollectionTitle
} from '@platyplus/react-rxdb-hasura'
import { ContentsCollection } from '@platyplus/rxdb-hasura'

export const CollectionMenuItem: React.FC<{ collection: ContentsCollection }> =
  ({ collection }) => {
    const [title] = useCollectionTitle(collection)
    const [icon] = useCollectionIcon(collection)
    const location = useLocation()
    const history = useHistory()
    const href = `/collection/${collection.name}`
    return (
      <Nav.Item
        onSelect={() => {
          history.push(href)
        }}
        key={collection.name}
        eventKey={href}
        active={location.pathname === href}
        icon={<Icon icon={icon} />}
      >
        {title}
      </Nav.Item>
    )
  }
