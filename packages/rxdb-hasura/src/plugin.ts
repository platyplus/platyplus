/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { RxPlugin } from 'rxdb'
import { BehaviorSubject } from 'rxjs'

import { info } from './console'
import { createHooks } from './contents/collection-hooks'
import { createContentReplicator } from './contents/replicator'
import { createMetadataReplicator } from './metadata/replicator'
import { metadataSchema } from './metadata/schema'
import { ContentsCollection, Database } from './types'

const jwt = new BehaviorSubject<string | undefined>(undefined)
const status = new BehaviorSubject<boolean>(false)
const hasura = new BehaviorSubject<Record<string, ContentsCollection>>({})

const hasuraCollections = (db: Database) =>
  Object.keys(db.collections)
    .filter(colName => db.collections[colName].options.metadata)
    .reduce<Record<string, ContentsCollection>>(
      (aggr, curr) => ((aggr[curr] = db.collections[curr]), aggr),
      {}
    )

export const RxHasuraPlugin: RxPlugin = {
  name: 'hasura-plugin',
  rxdb: true, // this must be true so rxdb knows that this is a rxdb-plugin and not a pouchdb-plugin

  prototypes: {
    RxDatabase: (proto: any) => {
      Object.defineProperty(proto, 'hasura$', {
        get: function (this: Database) {
          return hasura
        }
      })

      Object.defineProperty(proto, 'status$', {
        get: function (this: Database) {
          return status
        }
      })

      proto.setStatus = function (
        this: Database,
        value: boolean,
        jwt?: string
      ) {
        this.status$.next(value)
        this.jwt$.next(jwt)
      }

      proto.setJwt = function (this: Database, value: string) {
        this.jwt$.next(value)
      }

      Object.defineProperty(proto, 'jwt$', {
        get: function (this: Database) {
          return jwt
        }
      })

      Object.defineProperty(proto, 'hasura', {
        get: function (this: Database) {
          return hasura.getValue()
        }
      })
    }
  },
  hooks: {
    createRxDatabase: async (db: Database): Promise<void> => {
      info(`Add metadata to RxDatabase ${db.name}`)
      await db.addCollections({
        metadata: {
          schema: metadataSchema,
          autoMigrate: true
        }
      })
      await createMetadataReplicator(db.metadata)
      hasura.next(hasuraCollections(db))
    },

    createRxCollection: async (
      collection: ContentsCollection
    ): Promise<void> => {
      if (collection.options.metadata) {
        collection.metadata = collection.options.metadata
        await createContentReplicator(collection)
        info(`create RxCollection ${collection.name}`)
        createHooks(collection)
        hasura.next({
          ...hasuraCollections(collection.database),
          [collection.name]: collection
        })
      }
    }
  }
}
