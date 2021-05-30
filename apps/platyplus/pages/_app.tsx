import React from 'react'
import { AppProps } from 'next/app'
import { createClient } from 'nhost-js-sdk'
import 'rsuite/lib/styles/index.less' // or 'rsuite/dist/styles/rsuite-default.css'

import { Layout, Logo, MenuItem } from '@platyplus/layout'
import { HbpProvider, useAuthenticated } from '@platyplus/hbp'
import { RxDBHasuraProvider } from '@platyplus/react-rxdb-hasura'
import '../styles/theme.less'
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

const LayoutWrapper = ({ Component, pageProps }: AppProps) => {
  const authenticated = useAuthenticated(auth)
  const authSideMenu = useRoleMenu()
  return (
    <Layout
      logo={<Logo title="Platyplus" />}
      sideMenu={authenticated ? authSideMenu : publicSideMenu}
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
