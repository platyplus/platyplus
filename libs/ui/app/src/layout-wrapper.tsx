import deepMerge from 'deepmerge'

import { ConfigRecap, useConfigEnabled } from '@platyplus/react-rxdb-hasura'
import { Layout, Logo } from '@platyplus/layout'
import { useAuthenticated, useHbp } from '@platyplus/hbp'

import { ContentsMenu, MenuItem } from './menu'
import { AppConfig } from './types'
import { Routes } from './routes'
import { ComponentsContext } from './components'
import { defaultCollectionComponents } from './collections'
import { defaultDocumentComponents } from './documents'
import { defaultFieldComponents } from './fields'
import { ProfileStatusMenu } from '@platyplus/profile'

export const LayoutWrapper: React.FC<AppConfig> = ({
  title,
  children,
  ...config
}) => {
  const { auth } = useHbp()
  const authenticated = useAuthenticated(auth)
  const { components = {}, ...routesConfig } = config
  const configEnabled = useConfigEnabled()
  const {
    home = { enabled: true, title: 'Home' },
    login = { enabled: true, title: 'Login' },
    register = { enabled: true, title: 'Register' },
    profile = { enabled: true, title: 'Profile' },
    notFound = { enabled: true, title: '404' }
  } = routesConfig

  // * 'System' side menu e.g. login, register, home page...
  const privateSideMenu = []
  if (home.enabled) {
    privateSideMenu.unshift({
      icon: 'home',
      title: home.title,
      href: '/'
    })
  }

  const PublicMenu: React.FC = () => (
    <>
      {home.enabled && <MenuItem icon="home" title={home.title} href="/" />}
      {login.enabled && (
        <MenuItem icon="sign-in" title={login.title} href="/login" />
      )}
      {register.enabled && (
        <MenuItem icon="user-plus" title={register.title} href="/register" />
      )}
    </>
  )

  const PrivateMenu: React.FC = () => (
    <>
      {home.enabled && <MenuItem icon="home" title={home.title} href="/" />}
      <ContentsMenu roles={['user']} />
      {configEnabled && (
        <MenuItem icon="cog" title="Configuration" href="/config" />
      )}
    </>
  )

  // * Load components - defaults can be overriden and/or extended
  const overridenComponents = deepMerge(
    {
      collections: defaultCollectionComponents,
      fields: defaultFieldComponents,
      documents: defaultDocumentComponents
    },
    components
  )

  return (
    <ComponentsContext.Provider value={overridenComponents}>
      <Layout
        logo={<Logo title={title} />}
        menu={authenticated ? <PrivateMenu /> : <PublicMenu />}
        statusMenu={
          <>
            <ConfigRecap />
            <ProfileStatusMenu />
          </>
        }
      >
        <Routes {...{ home, register, login, profile, notFound, title }} />
      </Layout>
    </ComponentsContext.Provider>
  )
}
