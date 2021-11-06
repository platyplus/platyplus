import React, { useCallback, useEffect, useState } from 'react'
import { Provider } from 'rxdb-hooks'
import Auth from 'nhost-js-sdk/dist/Auth'

import { Database } from '@platyplus/rxdb-hasura'

import { initializeDB } from './database'
import { RxDatabase } from 'rxdb'

export const RxDBHasuraProvider: React.ComponentType<{
  auth: Auth
  url: string
  name?: string
}> = ({ auth, url, name, children }) => {
  const [db, setDb] = useState<Database>()

  const init = useCallback(async () => {
    const _db = await initializeDB(name, url, auth)
    setDb(_db)
  }, [auth, url, name])

  useEffect(() => {
    // Notice that RxDB instantiation is asynchronous; until db becomes available
    // consumer hooks that depend on it will still work, absorbing the delay by
    // setting their state to isFetching:true
    if (!db) init()
  }, [db, init])

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Provider db={db as RxDatabase<any>}>{children}</Provider>
  )
}

export default RxDBHasuraProvider
