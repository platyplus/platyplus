import { createRxHasura } from '@platyplus/rxdb-hasura'
import Auth from 'nhost-js-sdk/dist/Auth'
const DEFAULT_DB_NAME = 'rxdb'

export const initializeDB = async (name: string, auth: Auth) => {
  const db = await createRxHasura(
    name || DEFAULT_DB_NAME,
    process.env.NEXT_PUBLIC_HASURA_ENDPOINT
  )
  db.setAuthStatus(auth.isAuthenticated(), auth.getJWTToken())
  auth.onTokenChanged(() => {
    const token = auth.getJWTToken()
    console.log('token changed', !!token)
  })
  auth.onAuthStateChanged((status) => {
    console.log('status changed', status)
    db.setAuthStatus(status, auth.getJWTToken())
  })
  return db
}
