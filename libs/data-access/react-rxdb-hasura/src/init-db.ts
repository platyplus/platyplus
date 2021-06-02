import { createRxHasura } from '@platyplus/rxdb-hasura'
import Auth from 'nhost-js-sdk/dist/Auth'
const DEFAULT_DB_NAME = 'rxdb'

export const initializeDB = async (name: string, auth: Auth) => {
  const db = await createRxHasura(
    name || DEFAULT_DB_NAME,
    process.env.NX_HASURA_ENDPOINT
  )
  db.setAuthStatus(auth.isAuthenticated(), auth.getJWTToken())
  auth.onAuthStateChanged((status) => {
    db.setAuthStatus(status, auth.getJWTToken())
  })
  return db
}
