import { RxPlugin } from 'rxdb'

import { createRxCollection, createRxDatabase, RxDatabase } from './database'

export const RxHasuraPlugin: RxPlugin = {
  name: 'hasura-plugin',
  rxdb: true, // this must be true so rxdb knows that this is a rxdb-plugin and not a pouchdb-plugin

  prototypes: {
    RxDatabase
  },
  hooks: {
    createRxDatabase,
    createRxCollection
  }
}
