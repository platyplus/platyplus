import { Database, Roles } from '@platyplus/rxdb-hasura'

import { useRxDB } from 'rxdb-hooks'

export const useDB = (): Database<Roles> => useRxDB()
