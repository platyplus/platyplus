import { ContentsDocument } from '@platyplus/rxdb-hasura'

import { useSingleton } from '@platyplus/react-rxdb-hasura'

export const useProfile = (): ContentsDocument => useSingleton('me_users')
