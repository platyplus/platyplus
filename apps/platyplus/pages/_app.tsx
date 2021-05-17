import { AppProps } from 'next/app'
import { Layout, MenuItem, StatusMenuItem } from '@platyplus/layout'
import { HbpProvider, useAuthenticated } from '@platyplus/hbp'
import { RxDBHasuraProvider } from '../lib/rxdb-hasura-provider'
import { createClient } from 'nhost-js-sdk'
import { Icon } from 'rsuite'
import 'rsuite/lib/styles/index.less' // or 'rsuite/dist/styles/rsuite-default.css'
import '../styles/theme.less'
import React from 'react'
import { AuthStatusMenu } from '@platyplus/auth'
import { useRoleMenu } from '../lib/menu'

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
    <StatusMenuItem
      icon="facebook-official"
      title="Facebook"
      href="https://facebook.com"
      color="blue"
    />
    <AuthStatusMenu />
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
