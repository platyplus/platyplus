import { NhostAuthProvider } from '@nhost/react-auth'
import { createContext, FunctionComponent, useContext } from 'react'
import { NhostClient } from 'nhost-js-sdk'

const Context = createContext<Pick<NhostClient, 'auth' | 'storage'>>({
  auth: null,
  storage: null
})

export const HbpProvider: FunctionComponent<
  Pick<NhostClient, 'auth' | 'storage'>
> = ({ auth, storage, children }) => (
  <Context.Provider value={{ auth, storage }}>
    <NhostAuthProvider auth={auth}>{children}</NhostAuthProvider>
  </Context.Provider>
)

export default HbpProvider

export const useHbp = () => useContext(Context)
