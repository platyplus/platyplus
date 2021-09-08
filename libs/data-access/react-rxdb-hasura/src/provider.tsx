import React, { useEffect, useState } from 'react'
import { Provider } from 'rxdb-hooks'
import Auth from 'nhost-js-sdk/dist/Auth'

import { Database } from '@platyplus/rxdb-hasura'

import { initializeDB } from './database'
import { RxDatabase } from 'rxdb'

export const RxDBHasuraProvider: React.ComponentType<{
  auth: Auth
  name?: string
}> = ({ auth, name, children }) => {
  const [db, setDb] = useState<Database>()

  useEffect(() => {
    // Notice that RxDB instantiation is asynchronous; until db becomes available
    // consumer hooks that depend on it will still work, absorbing the delay by
    // setting their state to isFetching:true
    const initDB = async () => {
      const _db = await initializeDB(name, auth)
      setDb(_db)
    }
    if (!db) initDB()
  }, [auth, db, name])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Provider db={db as RxDatabase<any>}>{children}</Provider>
}
export default RxDBHasuraProvider
