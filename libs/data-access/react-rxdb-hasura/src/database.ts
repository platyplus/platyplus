import { useRxDB } from 'rxdb-hooks'
import Auth from 'nhost-js-sdk/dist/Auth'

import {
  Database,
  metadataStore,
  setAuthStatus,
  setJwt
} from '@platyplus/rxdb-hasura'
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
  auth.onTokenChanged(() => {
    console.log('JWT changed')
    setJwt(auth.getJWTToken())
  })
  metadataStore.subscribe(
    (jwt) => {
      console.log('JWT effectively changed')
    },
    (state) => state.jwt
  )

  return db
}

export const useDB = (): Database => useRxDB()
