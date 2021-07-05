import { Database, Roles } from '@platyplus/rxdb-hasura'

import { useRxDB } from 'rxdb-hooks'

export const useDB = () => useRxDB() as unknown as Database<Roles>
