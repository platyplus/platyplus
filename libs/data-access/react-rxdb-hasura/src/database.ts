import { useRxDB } from 'rxdb-hooks'
import Auth from 'nhost-js-sdk/dist/Auth'

import { Database, Roles, setAuthStatus } from '@platyplus/rxdb-hasura'
import { createRxHasura } from '@platyplus/rxdb-hasura'

const DEFAULT_DB_NAME = 'rxdb'

export const initializeDB = async (name: string, auth: Auth) => {
  const db = await createRxHasura(
    name || DEFAULT_DB_NAME,
    process.env.NX_HASURA_ENDPOINT
  )
  setAuthStatus(auth.isAuthenticated(), auth.getJWTToken())
  auth.onAuthStateChanged((status) => {
    setAuthStatus(status, auth.getJWTToken())
  })
  return db
}

export const useDB = (): Database<Roles> => useRxDB()
