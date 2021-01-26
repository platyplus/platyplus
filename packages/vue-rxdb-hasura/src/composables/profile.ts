import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { Ref } from 'vue'

import { useSingleton } from './collection'

export const useProfile = (): Readonly<Ref<ContentsDocument | undefined>> =>
  useSingleton('me_users')
