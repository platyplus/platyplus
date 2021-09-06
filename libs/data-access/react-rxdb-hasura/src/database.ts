import { useRxDB } from 'rxdb-hooks'
import Auth from 'nhost-js-sdk/dist/Auth'

import {
  ADMIN_ROLE,
  Database,
  setAuthStatus,
  setJwt
} from '@platyplus/rxdb-hasura'
import { createRxHasura } from '@platyplus/rxdb-hasura'

const DEFAULT_DB_NAME = 'rxdb'

const updateAuthToRxDB = (auth: Auth, status?: boolean) => {
  const authenticated = status ?? auth.isAuthenticated()
  const token = auth.getJWTToken()
  const admin = authenticated
    ? (auth.getClaim('x-hasura-allowed-roles') || []).includes(ADMIN_ROLE)
    : false
  setAuthStatus(authenticated, token, admin)
}

export const initializeDB = async (name: string, auth: Auth) => {
  const db = await createRxHasura(
    name || DEFAULT_DB_NAME,
    process.env.NX_HASURA_ENDPOINT
  )
  updateAuthToRxDB(auth)
  auth.onAuthStateChanged((status) => updateAuthToRxDB(auth, status))
  auth.onTokenChanged(() => setJwt(auth.getJWTToken()))

  return db
}

export const useDB = (): Database => useRxDB()
