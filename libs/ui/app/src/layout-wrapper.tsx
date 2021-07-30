import { useConfigEnabled } from '@platyplus/react-rxdb-hasura'
import { Layout, Logo } from '@platyplus/layout'
import { useAuthenticated } from '@platyplus/hbp'
import { ProfileStatusMenu } from '@platyplus/profile'
import { Menu } from './menu'
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
  components = {},
  home = { enabled: true, title: 'Home' },
  login = { enabled: true, title: 'Login' },
  notFound = { enabled: true, title: '404' },
  profile = { enabled: true, title: 'Profile' },
  register = { enabled: true, title: 'Register' },
  title
}) => {
  const authenticated = useAuthenticated()
  const config = useConfigEnabled()
  // * Load components - defaults can be overriden and/or extended
  const overridenComponents = deepmerge(components, defaultComponents)
  return (
    <ComponentsContext.Provider value={overridenComponents}>
      <Layout
        logo={<Logo title={title} />}
        menu={
          <Menu
            config={config}
            authenticated={authenticated}
            home={home}
            register={register}
            login={login}
          />
        }
        statusMenu={
          <>
            <ConfigStatusMenuItem />
            <ProfileStatusMenu />
          </>
        }
      >
        <Routes
          home={home}
          register={register}
          login={login}
          profile={profile}
          notFound={notFound}
        />
      </Layout>
    </ComponentsContext.Provider>
  )
}
