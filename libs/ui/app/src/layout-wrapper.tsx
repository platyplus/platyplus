import React, { useMemo } from 'react'
import deepmerge from 'deepmerge'

import { useAppConfig, useConfigEnabled } from '@platyplus/react-rxdb-hasura'
import { Layout, Logo } from '@platyplus/layout'
import { useAuthenticated } from '@platyplus/hbp'
import { ProfileStatusMenu } from '@platyplus/profile'
import { ThemeToggle } from '@platyplus/theme'

import { Menu } from './menu'
import { AppSettings } from './types'
import { PlatyplusRoutes } from './routes'
import { ComponentsContext } from './components'
import { defaultCollectionComponents } from './collections'
import { defaultDocumentComponents } from './documents'
import { defaultFieldComponents } from './fields'
import { ConfigStatusMenuItem } from './config'

const defaultComponents = {
  collections: defaultCollectionComponents,
  fields: defaultFieldComponents,
  documents: defaultDocumentComponents
}

const Title: React.FC<{ title: string }> = ({ title }) => {
  const authenticated = useAuthenticated()
  if (authenticated) return <PrivateTitle title={title} />
  else return <PublicTitle title={title} />
}

const PrivateTitle: React.FC<{ title: string }> = ({ title }) => {
  const { state, isFetching } = useAppConfig()
  if (isFetching) return null
  else return <Logo title={title} to={state?.home} />
}
const PublicTitle: React.FC<{ title: string }> = ({ title }) => (
  <Logo title={title} to="/" />
)
export const LayoutWrapper: React.FC<AppSettings> = ({
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
  const overridenComponents = useMemo(
    () => deepmerge(components, defaultComponents),
    [components]
  )
  return (
    <ComponentsContext.Provider value={overridenComponents}>
      <Layout
        logo={<Title title={title} />}
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
            <ThemeToggle />
            <ProfileStatusMenu />
          </>
        }
      >
        <PlatyplusRoutes
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
