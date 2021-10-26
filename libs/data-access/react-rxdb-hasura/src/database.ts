import { useRxDB } from 'rxdb-hooks'
import Auth from 'nhost-js-sdk/dist/Auth'

import { ADMIN_ROLE, Database } from '@platyplus/rxdb-hasura'
import { createRxHasura } from '@platyplus/rxdb-hasura'
import { isAuthenticated } from '@platyplus/hbp'

const DEFAULT_DB_NAME = 'rxdb'

const updateAuthToRxDB = (db: Database, auth: Auth, status?: boolean) => {
  console.log('[updateAuthToRxDB]', status)
  const authenticated = status ?? isAuthenticated(auth)
  console.log('[updateAuthToRxDB] is authenticated?', authenticated)
  const token = auth.getJWTToken()
  const admin = authenticated
    ? (auth.getClaim('x-hasura-allowed-roles') || []).includes(ADMIN_ROLE)
    : false
  db.setAuthStatus(authenticated, token, admin)
}

export const initializeDB = async (
  name: string = DEFAULT_DB_NAME,
  url: string,
  auth: Auth
) => {
  const db = await createRxHasura(name, url)
  console.log(`[initializeDB] successfully created RxHasura ${name}`)
  updateAuthToRxDB(db, auth)
  auth.onAuthStateChanged((status) => {
    console.log('[onAuthStateChanged]', status)
    updateAuthToRxDB(db, auth, status)
  })
  auth.onTokenChanged(() => db.jwt$.next(auth.getJWTToken()))
  return db
}

export const useDB = (): Database => useRxDB()
