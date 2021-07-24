import React, { useEffect, useState } from 'react'
import { Icon, Nav } from 'rsuite'
import { useHistory, useLocation } from 'react-router-dom'

import {
  useCollectionIcon,
  useCollectionTitle,
  useContentsCollections
} from '@platyplus/react-rxdb-hasura'
import { ContentsCollection } from '@platyplus/rxdb-hasura'

const CollectionMenu: React.FC<{ collection: ContentsCollection }> = ({
  collection
}) => {
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

const RoleMenu: React.FC<{ role: string }> = ({ role }) => {
  const allCollections = useContentsCollections()
  const [collections, setCollections] = useState<ContentsCollection[]>([])
  useEffect(() => {
    setCollections(
      Object.values(allCollections).filter(
        (collection) => collection.role === role
      )
    )
  }, [allCollections, role])

  return (
    <>
      {collections.map((collection) => (
        <CollectionMenu key={collection.name} collection={collection} />
      ))}
    </>
  )
}

export const ContentsMenu: React.FC<{ roles: string[] }> = ({
  roles = ['user']
}) => {
  return (
    <>
      {roles.map((r) => (
        <RoleMenu key={r} role={r} />
      ))}
    </>
  )
}
