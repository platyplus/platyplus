import { produce } from 'immer'
import { RxDatabase } from 'rxdb'
import { initConfigCollections, metadataSchema } from './metadata'
import { MetadataStore, metadataStore, setCollectionIsReady } from './store'

export const getJwt = () => metadataStore.getState().jwt

export const setAuthStatus = (status: boolean, jwt?: string) =>
  metadataStore.setState(
    produce<MetadataStore>((partial) => {
      partial.authenticated = status
      partial.jwt = jwt
    })
  )

export const setJwt = (jwt: string) =>
  metadataStore.setState(
    produce<MetadataStore>((partial) => {
      partial.jwt = jwt
    })
  )

export const onAuthChange =
  (db: RxDatabase) => async (authenticated: boolean) => {
    if (authenticated) {
      await initConfigCollections(db)
      const addMetadataCollection = async () => {
        await db.addCollections({
          metadata: {
            options: { isMetadata: true },
            schema: metadataSchema,
            autoMigrate: true
          }
        })
        setCollectionIsReady('metadata')
      }
      if (metadataStore.getState().isConfigReady())
        await addMetadataCollection()
      else
        metadataStore.subscribe(
          async (ready: boolean) => ready && (await addMetadataCollection()),
          (state) => state.isConfigReady()
        )
    }
  }
