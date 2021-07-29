import React from 'react'
import { Icon, Nav } from 'rsuite'
import { useHistory, useLocation } from 'react-router-dom'

import {
  useCollectionIcon,
  useCollectionTitle,
  useOrderedContentsCollections
} from '@platyplus/react-rxdb-hasura'
import { ContentsCollection } from '@platyplus/rxdb-hasura'
import { MenuItem } from '@platyplus/layout'

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

const HomeItem: React.FC<{ title?: string; enabled?: boolean }> = ({
  enabled,
  title
}) => enabled && <MenuItem icon="home" title={title} href="/" />

export const PrivateMenu: React.FC<{
  home: { enabled?: boolean; title?: string }
  config: boolean
}> = ({ home, config }) => {
  const [collections] = useOrderedContentsCollections()
  return (
    <>
      <HomeItem {...home} />
      {[...collections.values()].map((collection) => (
        <CollectionMenuItem key={collection.name} collection={collection} />
      ))}
      {config && (
        <MenuItem icon="wrench" title="Configuration" href="/config" />
      )}
    </>
  )
}

// * 'System' side menu e.g. login, register, home page...
export const PublicMenu: React.FC<
  Record<'home' | 'login' | 'register', { enabled?: boolean; title?: string }>
> = ({ home, login, register }) => (
  <>
    <HomeItem {...home} />
    {login.enabled && (
      <MenuItem icon="sign-in" title={login.title} href="/login" />
    )}
    {register.enabled && (
      <MenuItem icon="user-plus" title={register.title} href="/register" />
    )}
  </>
)
