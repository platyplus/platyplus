import { Database, Roles } from '@platyplus/rxdb-hasura'
import { useRxDB } from './hooks'

export const useDB = () => (useRxDB() as unknown) as Database<Roles>
