import { createRxHasura, Database } from '@platyplus/rxdb-hasura'
import React, { createContext, FunctionComponent, useContext } from 'react'
import { createGlobalState, useAsync } from 'react-use'

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
      console.log('create db!!!')
      const createDB = await createRxHasura(
        name || DEFAULT_DB_NAME,
        process.env.NEXT_PUBLIC_HASURA_ENDPOINT
      )
      setDB(createDB)
      createDB.setAuthStatus(auth.isAuthenticated(), auth.getJWTToken())
      auth.onTokenChanged(() => {
        const token = auth.getJWTToken()
        console.log('token changed', !!token)
      })
      auth.onAuthStateChanged((status) => {
        console.log('status changed', status)
        createDB.setAuthStatus(status, auth.getJWTToken())
      })
      return db
    }
  }, [db])

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
