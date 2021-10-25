import { BrowserRouter } from 'react-router-dom'
import { createClient } from 'nhost-js-sdk'
import { HbpProvider } from '@platyplus/hbp'
import '@platyplus/theme'
import { RxDBHasuraProvider } from '@platyplus/react-rxdb-hasura'
import { LayoutWrapper } from './layout-wrapper'
import { AppConfig } from './types'
import { useConfig } from './config'

const RootApp: React.ComponentType<AppConfig> = ({
  hasuraUrl,
  authUrl,
  ...config
}) => {
  const { auth, storage } = createClient({
    baseURL: authUrl,
    useCookies: false,
    // * Autorefresh interval in ms (defaults to Math.max(30 * 1000, JWTExpiresIn - 45000))
    // TODO use JWTExpiresIn
    refreshIntervalTime: 60000
  })
  return (
    <BrowserRouter>
      <HbpProvider auth={auth} storage={storage}>
        <RxDBHasuraProvider url={hasuraUrl} auth={auth}>
          <LayoutWrapper {...config} />
        </RxDBHasuraProvider>
      </HbpProvider>
    </BrowserRouter>
  )
}

export const App: React.FC = () => {
  const { config, loading } = useConfig()
  if (loading) return null
  else return <RootApp {...config} />
}
