import { AppProps } from 'next/app'
import { Layout } from '@platyplus/layout'
import { NhostAuthProvider } from '@nhost/react-auth'
import { auth } from '@platyplus/hbp'
import { Menu } from 'antd'
import {
  UploadOutlined,
  VideoCameraOutlined,
  UserOutlined
} from '@ant-design/icons'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <NhostAuthProvider auth={auth}>
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
    </NhostAuthProvider>
  )
}
export default CustomApp
