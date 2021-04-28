import { AppProps } from 'next/app'
import { Layout, StatusMenuItem } from '@platyplus/layout'
import { HbpProvider } from '@platyplus/hbp'
import { UserOutlined } from '@ant-design/icons'
import { RxDBHasuraProvider } from './rxdb-hasura-provider'
import { SettingOutlined } from '@ant-design/icons'
import { createClient } from 'nhost-js-sdk'

function App({ Component, pageProps }: AppProps) {
  const { auth, storage } = createClient({
    baseURL: process.env.NEXT_PUBLIC_HBP_ENDPOINT
  })
  return (
    <div
      style={{
        height: '100%'
      }}
    >
      <HbpProvider auth={auth} storage={storage}>
        <RxDBHasuraProvider auth={auth}>
          <Layout
            sideMenu={[
              {
                icon: <UserOutlined />,
                title: 'Home',
                href: '/'
              },
              {
                icon: <UserOutlined />,
                title: 'Login',
                href: '/login'
              },
              {
                icon: <UserOutlined />,
                title: 'Register',
                href: '/register'
              },
              {
                icon: <UserOutlined />,
                title: 'A submenu',
                children: [
                  {
                    icon: <UserOutlined />,
                    title: 'Test',
                    href: '/test'
                  }
                ]
              }
            ]}
            statusMenu={
              <>
                <StatusMenuItem
                  icon={SettingOutlined}
                  title="Settings"
                  href="/settings"
                />
                <StatusMenuItem
                  icon={SettingOutlined}
                  title="Settings"
                  href="/settings"
                />
                <div>dudule</div>
              </>
            }
          >
            <Component {...pageProps} />
          </Layout>
        </RxDBHasuraProvider>
      </HbpProvider>
    </div>
  )
}
export default App
