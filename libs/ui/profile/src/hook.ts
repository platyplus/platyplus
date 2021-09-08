import { useSingleton } from '@platyplus/react-rxdb-hasura'
import { Contents } from '@platyplus/rxdb-hasura'

export const useProfile = () => useSingleton<Contents>('me_users')
