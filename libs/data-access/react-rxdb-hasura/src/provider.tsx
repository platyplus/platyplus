import React, { useEffect, useState } from 'react'
import { RxChangeEvent, RxDatabase } from 'rxdb'
import { Provider } from 'rxdb-hooks'
import Auth from 'nhost-js-sdk/dist/Auth'

import { initializeDB } from './database'
import { useStore } from './store'
import {
  CONFIG_COLLECTIONS,
  CONFIG_COLLECTION_IDS
} from '@platyplus/rxdb-hasura'
export const RxDBHasuraProvider: React.ComponentType<{
  auth: Auth
  name?: string
}> = ({ auth, name, children }) => {
  const [db, setDb] = useState<RxDatabase>()
  const setConfig = useStore((state) => state.setConfig)

  useEffect(() => {
    // Notice that RxDB instantiation is asynchronous; until db becomes available
    // consumer hooks that depend on it will still work, absorbing the delay by
    // setting their state to isFetching:true
    const initDB = async () => {
      const _db = await initializeDB(name, auth)
      _db.$.subscribe((value: RxChangeEvent) => {
        if ((CONFIG_COLLECTIONS as string[]).includes(value.collectionName)) {
          const id =
            value.documentData[CONFIG_COLLECTION_IDS[value.collectionName]]
          if (id) setConfig(value.collectionName, id, value.documentData)
        }
      })
      setDb(_db as unknown as RxDatabase)
    }
    if (!db) initDB()
  })
  return <Provider db={db as unknown as RxDatabase}>{children}</Provider>
}
export default RxDBHasuraProvider
