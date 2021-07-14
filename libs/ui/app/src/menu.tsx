import {
  useCollectionIcon,
  useCollectionTitle,
  useContentsCollections
} from '@platyplus/react-rxdb-hasura'
import { IconType } from '@platyplus/layout'
import React, { useEffect, useState } from 'react'
import { Icon, Nav } from 'rsuite'
import { ContentsCollection } from '@platyplus/rxdb-hasura'
import { useHistory, useLocation } from 'react-router-dom'

export const MenuItem: React.FC<{
  icon?: IconType
  href: string
  title: string
}> = ({ icon, href, title }) => {
  const history = useHistory()
  const location = useLocation()
  return (
    <Nav.Item
      onSelect={() => {
        history.push(href)
      }}
      key={href}
      active={location.pathname === href}
      icon={icon && <Icon icon={icon} />}
    >
      {title}
    </Nav.Item>
  )
}

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
