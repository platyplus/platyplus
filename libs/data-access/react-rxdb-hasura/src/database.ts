import { useRxDB } from 'rxdb-hooks'
import Auth from 'nhost-js-sdk/dist/Auth'

import { ADMIN_ROLE, Database } from '@platyplus/rxdb-hasura'
import { createRxHasura } from '@platyplus/rxdb-hasura'

const DEFAULT_DB_NAME = 'rxdb'

const updateAuthToRxDB = (db: Database, auth: Auth, status?: boolean) => {
  const authenticated = status ?? auth.isAuthenticated()
  const token = auth.getJWTToken()
  const admin = authenticated
    ? (auth.getClaim('x-hasura-allowed-roles') || []).includes(ADMIN_ROLE)
    : false
  db.setAuthStatus(authenticated, token, admin)
}

export const initializeDB = async (name: string, url: string, auth: Auth) => {
  const db = await createRxHasura(name || DEFAULT_DB_NAME, url)
  updateAuthToRxDB(db, auth)
  auth.onAuthStateChanged((status) => updateAuthToRxDB(db, auth, status))
  auth.onTokenChanged(() => db.jwt$.next(auth.getJWTToken()))
  return db
}

export const useDB = (): Database => useRxDB()
