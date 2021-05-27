import React, { FunctionComponent, useEffect, useState } from 'react'

import Auth from 'nhost-js-sdk/dist/Auth'
import { initializeDB } from './init-db'
import { Provider } from './hooks'
import { RxDatabase } from 'rxdb'

export const RxDBHasuraProvider: FunctionComponent<{
  auth: Auth
  name?: string
}> = ({ auth, name, children }) => {
  const [db, setDb] = useState<RxDatabase>()

  useEffect(() => {
    // Notice that RxDB instantiation is asynchronous; until db becomes available
    // consumer hooks that depend on it will still work, absorbing the delay by
    // setting their state to isFetching:true
    const initDB = async () => {
      const _db = await initializeDB(name, auth)
      setDb((_db as unknown) as RxDatabase)
    }
    if (!db) initDB()
  })

  return <Provider db={(db as unknown) as RxDatabase}>{children}</Provider>
}
export default RxDBHasuraProvider
