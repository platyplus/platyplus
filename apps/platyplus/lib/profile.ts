import { ContentsDocument } from '@platyplus/rxdb-hasura'

import { useSingleton } from './singleton'

export const useProfile = (): ContentsDocument => useSingleton('me_users')
