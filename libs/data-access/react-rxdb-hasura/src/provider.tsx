import React, { useEffect, useState } from 'react'
import { RxDatabase } from 'rxdb'
import { Provider } from 'rxdb-hooks'
import Auth from 'nhost-js-sdk/dist/Auth'

import { initializeDB } from './init-db'
export const RxDBHasuraProvider: React.FC<{
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
      setDb(_db as unknown as RxDatabase)
    }
    if (!db) initDB()
  })

  return <Provider db={db as unknown as RxDatabase}>{children}</Provider>
}
export default RxDBHasuraProvider
