import { useConfigEnabled } from '@platyplus/react-rxdb-hasura'
import { Layout, Logo } from '@platyplus/layout'
import { useAuthenticated, useHbp } from '@platyplus/hbp'
import { ProfileStatusMenu } from '@platyplus/profile'

import { PrivateMenu, PublicMenu } from './menu'
import { AppConfig } from './types'
import { Routes } from './routes'
import { ComponentsContext } from './components'
import { defaultCollectionComponents } from './collections'
import { defaultDocumentComponents } from './documents'
import { defaultFieldComponents } from './fields'
import { ConfigStatusMenuItem } from './pages'
import React from 'react'
import deepmerge from 'deepmerge'

const defaultComponents = {
  collections: defaultCollectionComponents,
  fields: defaultFieldComponents,
  documents: defaultDocumentComponents
}
export const LayoutWrapper: React.FC<AppConfig> = ({
  title,
  components = {},
  home = { enabled: true, title: 'Home' },
  login = { enabled: true, title: 'Login' },
  register = { enabled: true, title: 'Register' },
  profile = { enabled: true, title: 'Profile' },
  notFound = { enabled: true, title: '404' }
}) => {
  const hbp = useHbp()
  const authenticated = useAuthenticated(hbp.auth)
  const config = useConfigEnabled()
  // * Load components - defaults can be overriden and/or extended
  const overridenComponents = deepmerge(defaultComponents, components)

  return (
    <ComponentsContext.Provider value={overridenComponents}>
      <Layout
        logo={<Logo title={title} />}
        menu={
          authenticated ? (
            <PrivateMenu config={config} home={home} />
          ) : (
            <PublicMenu home={home} register={register} login={login} />
          )
        }
        statusMenu={
          <>
            <ConfigStatusMenuItem />
            <ProfileStatusMenu />
          </>
        }
      >
        <Routes {...{ home, register, login, profile, notFound, title }} />
      </Layout>
    </ComponentsContext.Provider>
  )
}
