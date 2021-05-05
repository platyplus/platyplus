import { AppProps } from 'next/app'
import { Layout, SideMenuItem, StatusMenuItem } from '@platyplus/layout'
import { HbpProvider } from '@platyplus/hbp'
import { RxDBHasuraProvider } from './rxdb-hasura-provider'
import { createClient } from 'nhost-js-sdk'
import { Icon } from 'rsuite'
import 'rsuite/lib/styles/index.less' // or 'rsuite/dist/styles/rsuite-default.css'
import '../styles/theme.less'
import { useState } from 'react'
import React from 'react'
import { AuthStatusMenu } from '@platyplus/auth'

const publicSideMenu: SideMenuItem[] = [
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
const authSideMenu: SideMenuItem[] = [
  {
    icon: 'home',
    title: 'Home',
    href: '/home'
  },
  {
    icon: 'pie-chart',
    title: 'A submenu',
    children: [
      {
        icon: 'facebook-official',
        title: 'Test',
        href: '/test'
      }
    ]
  }
]

const { auth, storage } = createClient({
  baseURL: process.env.NEXT_PUBLIC_HBP_ENDPOINT
})

function App({ Component, pageProps }: AppProps) {
  const [authenticated, setAuthenticated] = useState(auth.isAuthenticated())

  auth.onAuthStateChanged((isAuth) => {
    setAuthenticated(isAuth)
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
  return (
    <HbpProvider auth={auth} storage={storage}>
      <RxDBHasuraProvider auth={auth}>
        <Layout
          logo={
            <div className="logo">
              <Icon
                icon="logo-analytics"
                size="lg"
                style={{ verticalAlign: 0 }}
              />
              <span style={{ marginLeft: 12 }}> PlatyPlus</span>
            </div>
          }
          sideMenu={authenticated ? authSideMenu : publicSideMenu}
          statusMenu={statusMenu}
        >
          <Component {...pageProps} />
        </Layout>
      </RxDBHasuraProvider>
    </HbpProvider>
  )
}
export default App
