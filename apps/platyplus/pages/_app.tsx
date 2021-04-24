import { AppProps } from 'next/app'
import { Layout } from '@platyplus/layout'
import { Menu } from 'antd'
import { HbpProvider } from '@platyplus/hbp'
import {
  UploadOutlined,
  VideoCameraOutlined,
  UserOutlined
} from '@ant-design/icons'
import { RxDBHasuraProvider } from './rxdb-hasura-provider'

import { createClient } from 'nhost-js-sdk'

function CustomApp({ Component, pageProps }: AppProps) {
  const { auth, storage } = createClient({
    baseURL: process.env.NEXT_PUBLIC_HBP_ENDPOINT
  })
  return (
    <HbpProvider auth={auth} storage={storage}>
      <RxDBHasuraProvider auth={auth}>
        <Layout
          menu={
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
        >
          <Component {...pageProps} />
        </Layout>
      </RxDBHasuraProvider>
    </HbpProvider>
  )
}
export default CustomApp
