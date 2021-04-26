import { AppProps } from 'next/app'
import { Layout, StatusMenuItem } from '@platyplus/layout'
import { Menu } from 'antd'
import { HbpProvider } from '@platyplus/hbp'
import {
  UploadOutlined,
  VideoCameraOutlined,
  UserOutlined
} from '@ant-design/icons'
import { RxDBHasuraProvider } from './rxdb-hasura-provider'
import { SettingOutlined } from '@ant-design/icons'
import { createClient } from 'nhost-js-sdk'

function App({ Component, pageProps }: AppProps) {
  const { auth, storage } = createClient({
    baseURL: process.env.NEXT_PUBLIC_HBP_ENDPOINT
  })
  return (
    <HbpProvider auth={auth} storage={storage}>
      <RxDBHasuraProvider auth={auth}>
        <Layout
          sideMenu={
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                nav 1
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                nav 2
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                nav 3
              </Menu.Item>
            </Menu>
          }
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
  )
}
export default App
