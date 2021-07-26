import { useSingleton } from '@platyplus/react-rxdb-hasura'

export const useProfile = () => useSingleton('me_users')
