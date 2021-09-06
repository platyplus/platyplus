import { RxCollectionCreator } from 'rxdb/dist/types/types'
import { TableInfo } from '../../types'

import { toJsonSchema } from '../schema'

export const contentsCollectionCreator = (
  table: Partial<TableInfo>,
  role: string
): RxCollectionCreator => {
  // const version = update ? Object.keys(previousMigrations).length + 1 : 0
  const version = 0
  return {
    schema: toJsonSchema(table, role, version),
    statics: {},
    methods: {},
    options: { tableId: table.id, role }

    //   migrationStrategies: update
    //     ? {
    //         ...previousMigrations,
    //         [version]: (doc) => {
    //           doc._deleted = false
    //           console.log('TODO migration', doc)
    //           if ('bidon' in doc) delete doc.bidon
    //           return doc
    //         }
    //       }
    //     : {}
  }
}
