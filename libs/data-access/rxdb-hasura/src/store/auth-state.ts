import { produce } from 'immer'
import { RxDatabase } from 'rxdb'
import { addTableInfoCollection, initConfigCollections } from '../metadata'
import { TableInfoStore, tableInfoStore } from './store'

export const getJwt = () => tableInfoStore.getState().jwt

export const setAuthStatus = (status: boolean, jwt: string, isAdmin: boolean) =>
  tableInfoStore.setState(
    produce<TableInfoStore>((partial) => {
      partial.authenticated = status
      partial.jwt = jwt
      partial.admin = status ? isAdmin : false
    })
  )

export const setJwt = (jwt: string) =>
  tableInfoStore.setState(
    produce<TableInfoStore>((partial) => {
      partial.jwt = jwt
    })
  )

export const onAuthChange =
  (db: RxDatabase) => async (authenticated: boolean) => {
    if (authenticated) {
      await initConfigCollections(db)
      if (tableInfoStore.getState().isConfigReady())
        await addTableInfoCollection(db)
      else
        tableInfoStore.subscribe(
          async (ready: boolean) => ready && (await addTableInfoCollection(db)),
          (state) => state.isConfigReady()
        )
    }
  }
