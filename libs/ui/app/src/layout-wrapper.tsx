import { Layout, Logo, MenuItem } from '@platyplus/layout'
import { useAuthenticated, useHbp } from '@platyplus/hbp'

import { useRoleMenu } from './menu'
import { AppConfig } from './types'
import { Routes } from './routes'

export const LayoutWrapper: React.FC<AppConfig> = ({
  title,
  children,

  ...config
}) => {
  const { auth } = useHbp()
  const authenticated = useAuthenticated(auth)

  const authSideMenu = useRoleMenu()
  const publicSideMenu: MenuItem[] = []
  if (config.home?.enabled !== false)
    publicSideMenu.push({
      icon: 'home',
      title: 'Home',
      href: '/'
    })
  if (config.login?.enabled !== false)
    publicSideMenu.push({
      icon: 'sign-in',
      title: 'Login',
      href: '/login'
    })
  if (config.register?.enabled !== false)
    publicSideMenu.push({
      icon: 'user-plus',
      title: 'Register',
      href: '/register'
    })
  return (
    <Layout
      logo={<Logo title={title} />}
      sideMenu={authenticated ? authSideMenu : publicSideMenu}
    >
      <Routes {...config} />
    </Layout>
  )
}
