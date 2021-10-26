import { NhostAuthProvider } from '@nhost/react-auth'
import { createContext, FunctionComponent, useContext } from 'react'
import { createClient, NhostClient } from 'nhost-js-sdk'

const Context = createContext<Pick<NhostClient, 'auth' | 'storage'>>({
  auth: null,
  storage: null
})

export const createHbpClient = (authUrl: string) => {
  const { auth, storage } = createClient({
    baseURL: authUrl,
    useCookies: false,
    // * Autorefresh interval in ms (defaults to Math.max(30 * 1000, JWTExpiresIn - 45000))
    // TODO use JWTExpiresIn
    refreshIntervalTime: 60000
  })

  window.addEventListener('load', function () {
    function updateOnlineStatus(event: Event) {
      const condition = navigator.onLine ? 'online' : 'offline'

      console.log(
        'beforeend',
        'Event: ' + event.type + '; Status: ' + condition
      )
      if (condition) auth.refreshSession()
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
  })
  return { auth, storage }
}

export const HbpProvider: FunctionComponent<
  Pick<NhostClient, 'auth' | 'storage'>
> = ({ auth, storage, children }) => (
  <Context.Provider value={{ auth, storage }}>
    <NhostAuthProvider auth={auth}>{children}</NhostAuthProvider>
  </Context.Provider>
)

export default HbpProvider

export const useHbp = () => useContext(Context)
