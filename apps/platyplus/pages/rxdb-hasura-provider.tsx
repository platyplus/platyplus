import { createRxHasura, Database } from '@platyplus/rxdb-hasura'
import { createContext, FunctionComponent, useContext } from 'react'
import { createGlobalState, useAsync } from 'react-use'
import React from 'react'
import Auth from 'nhost-js-sdk/dist/Auth'
import { Loading } from '@platyplus/navigation'

const DEFAULT_DB_NAME = 'rxdb'

const useGlobalValue = createGlobalState<Database | null>()

const RxDBHasuraContext = createContext<{ db: Database }>({ db: null })

export const RxDBHasuraProvider: FunctionComponent<{
  auth: Auth
  name?: string
}> = ({ auth, name, children }) => {
  const [db, setDB] = useGlobalValue()
  const state = useAsync(async () => {
    if (db) return db
    else {
      setDB(
        await createRxHasura(
          name || DEFAULT_DB_NAME,
          process.env.NEXT_PUBLIC_HASURA_ENDPOINT
        )
      )
      db.setAuthStatus(auth.isAuthenticated(), auth.getJWTToken())
      auth.onTokenChanged(() => {
        const token = auth.getJWTToken()
        console.log('token changed', token)
      })
      auth.onAuthStateChanged((status) => {
        console.log('status changed', status)
        db.setAuthStatus(status, auth.getJWTToken())
      })
      return db
    }
  }, [db])

  // TODO custom spinner
  if (state.loading) return <Loading />
  else
    return (
      <RxDBHasuraContext.Provider value={{ db: state.value }}>
        {children}
      </RxDBHasuraContext.Provider>
    )
}
export default RxDBHasuraProvider

export const useDB = () => useContext(RxDBHasuraContext)
