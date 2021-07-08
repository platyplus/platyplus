import { Layout, Logo, MenuItem } from '@platyplus/layout'
import { useAuthenticated, useHbp } from '@platyplus/hbp'

import { useRoleMenu } from './menu'
import { AppConfig } from './types'
import { Routes } from './routes'
import { ComponentsContext } from './components'
import { defaultCollectionComponents } from './collections'
import { defaultFieldComponents } from './fields'
import { defaultDocumentComponents } from './documents'

export const LayoutWrapper: React.FC<AppConfig> = ({
  title,
  children,
  ...config
}) => {
  const { auth } = useHbp()
  const authenticated = useAuthenticated(auth)

  const { components, ...routesConfig } = config
  const {
    home = { enabled: true, title: 'Home' },
    login = { enabled: true, title: 'Login' },
    register = { enabled: true, title: 'Register' },
    profile = { enabled: true, title: 'Profile' },
    notFound = { enabled: true, title: '404' }
  } = routesConfig

  // * 'System' side menu e.g. login, register, home page...
  const privateSideMenu = useRoleMenu()
  const publicSideMenu: MenuItem[] = []
  if (home.enabled) {
    publicSideMenu.unshift({
      icon: 'home',
      title: home.title,
      href: '/'
    })
    privateSideMenu.unshift({
      icon: 'home',
      title: home.title,
      href: '/'
    })
  }
  if (login.enabled)
    publicSideMenu.push({
      icon: 'sign-in',
      title: login.title,
      href: '/login'
    })
  if (register.enabled)
    publicSideMenu.push({
      icon: 'user-plus',
      title: register.title,
      href: '/register'
    })

  // * Load collection and field components - defaults can be overriden and/or extended
  const collections = {
    ...defaultCollectionComponents,
    ...components?.collections
  }
  const fields = { ...defaultFieldComponents, ...components?.fields }
  const documents = { ...defaultDocumentComponents, ...components?.documents }
  return (
    <ComponentsContext.Provider value={{ collections, fields, documents }}>
      <Layout
        logo={<Logo title={title} />}
        sideMenu={authenticated ? privateSideMenu : publicSideMenu}
      >
        <Routes {...{ home, register, login, profile, notFound, title }} />
      </Layout>
    </ComponentsContext.Provider>
  )
}
