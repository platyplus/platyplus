/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { RxPlugin } from 'rxdb'
import { BehaviorSubject } from 'rxjs'

import { info } from './console'
import { createContentReplicator } from './contents/replicator'
import { createMetadataReplicator } from './metadata/replicator'
import { metadataSchema } from './metadata/schema'
import { ContentsCollection, Database } from './types'

// const forbiddenInsert = table.columns
//   .filter(column => !column.canInsert.length)
//   .map(column => column.column_name as string)
// const forbibbenUpdate = table.columns
//   .filter(column => !column.canUpdate.length && !column.primaryKey)
//   .map(column => column.column_name as string)
// TODO 1. Set defaut values from permissions "column preset"
// TODO 2. Set to SQL default,
// TODO 3. Cet to NULL (delete) if column is nullable.
// TODO 4. Raise an error otherwise
// TODO BUT we don't want these values to be sent over to the server => delete forbidden keys in the replicator push event
// TODO in the replicator: in the upsert stuff, use only permitted columns in the insert and the update (on conflict) part
// db.collections[name].preInsert((data: Contents) => {
//   forbiddenInsert.forEach(column => delete data[column])
//   return data
// }, false)
// db.collections[name].preSave((data: Contents) => {
//   forbibbenUpdate.forEach(column => delete data[column])
//   return data
// }, false)
// }
// info(`DatabaseService: initialised ${tablesArray.length} collections`)
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
        hasura.next({
          ...hasuraCollections(collection.database),
          [collection.name]: collection
        })
      }
    }
  }
}
