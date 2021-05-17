import { createRxHasura, Database } from '@platyplus/rxdb-hasura'
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState
} from 'react'
import { createGlobalState, useAsync } from 'react-use'

import Auth from 'nhost-js-sdk/dist/Auth'
import { Loading } from '@platyplus/navigation'
import { BehaviorSubject } from 'rxjs'

const DEFAULT_DB_NAME = 'rxdb'

const useGlobalValue = createGlobalState<Database | null>()

const RxDBHasuraContext = createContext<{ db?: Database }>({ db: undefined })

export const RxDBHasuraProvider: FunctionComponent<{
  auth: Auth
  name?: string
}> = ({ auth, name, children }) => {
  const [db, setDB] = useGlobalValue()
  const state = useAsync(async () => {
    console.log('useAsync')
    if (db) return db
    else {
      console.log(
        'create db!!! -> ok when already auth, not always ok with next hot reload'
      )
      const newDB = await createRxHasura(
        name || DEFAULT_DB_NAME,
        process.env.NEXT_PUBLIC_HASURA_ENDPOINT
      )
      setDB(newDB)
      newDB.setAuthStatus(auth.isAuthenticated(), auth.getJWTToken())
      auth.onTokenChanged(() => {
        const token = auth.getJWTToken()
        console.log('token changed', !!token)
      })
      auth.onAuthStateChanged((status) => {
        console.log('status changed', status)
        newDB.setAuthStatus(status, auth.getJWTToken())
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

export const useDB = () => {
  const initialContext = useContext(RxDBHasuraContext)
  const [ctx, setCtx] = useState(initialContext)
  useEffect(() => {
    if (ctx.db) setCtx(ctx)
  }, [ctx])
  return ctx.db
}
