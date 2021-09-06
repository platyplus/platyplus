import { produce } from 'immer'
import { RxDatabase } from 'rxdb'
import { initConfigCollections, tableInformationSettings } from '../metadata'
import { TableInfoStore, tableInfoStore, setCollectionIsReady } from './store'

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
      const addTableInfoCollection = async () => {
        await db.addCollections({
          table_info: {
            options: { isTableInfo: true, config: tableInformationSettings },
            schema: tableInformationSettings.schema,
            autoMigrate: true
          }
        })
        setCollectionIsReady('table_info')
      }
      if (tableInfoStore.getState().isConfigReady())
        await addTableInfoCollection()
      else
        tableInfoStore.subscribe(
          async (ready: boolean) => ready && (await addTableInfoCollection()),
          (state) => state.isConfigReady()
        )
    }
  }
