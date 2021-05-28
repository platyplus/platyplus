import React from 'react'
import { Button, ButtonToolbar, Icon, Popover, Whisper } from 'rsuite'
import { AppProps } from 'next/app'
import { createClient } from 'nhost-js-sdk'
import 'rsuite/lib/styles/index.less' // or 'rsuite/dist/styles/rsuite-default.css'

import { Layout, MenuItem, StatusMenuItem } from '@platyplus/layout'
import { HbpProvider, useAuthenticated } from '@platyplus/hbp'
import { AuthStatusMenu } from '@platyplus/auth'
import { RxDBHasuraProvider } from '@platyplus/react-rxdb-hasura'
import '../styles/theme.less'
import { useRoleMenu } from '../lib/menu'
import { ProfileStatusMenu } from '@platyplus/profile'

const publicSideMenu: MenuItem[] = [
  {
    icon: 'home',
    title: 'Home',
    href: '/'
  },
  {
    icon: 'sign-in',
    title: 'Login',
    href: '/login'
  },
  {
    icon: 'user-plus',
    title: 'Register',
    href: '/register'
  }
]

const { auth, storage } = createClient({
  baseURL: process.env.NEXT_PUBLIC_HBP_ENDPOINT
})

const statusMenu = (
  <>
    <AuthStatusMenu />
    <ProfileStatusMenu />
    <StatusMenuItem
      icon="facebook-official"
      title="Facebook"
      href="https://facebook.com"
      color="blue"
    />
  </>
)

const LayoutWrapper = ({ Component, pageProps }: AppProps) => {
  const authenticated = useAuthenticated(auth)
  const authSideMenu = useRoleMenu()
  return (
    <Layout
      logo={
        <div className="logo">
          <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0 }} />
          <span style={{ marginLeft: 12 }}> PlatyPlus</span>
        </div>
      }
      sideMenu={authenticated ? authSideMenu : publicSideMenu}
      statusMenu={statusMenu}
    >
      <Component {...pageProps} />
    </Layout>
  )
}

function App(app: AppProps) {
  return (
    <HbpProvider auth={auth} storage={storage}>
      <RxDBHasuraProvider auth={auth}>
        <LayoutWrapper {...app} />
      </RxDBHasuraProvider>
    </HbpProvider>
  )
}
export default App
