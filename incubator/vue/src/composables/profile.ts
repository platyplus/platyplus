import { ContentsDocument } from '@platyplus/rxdb-hasura/src'
import { useSingleton } from '@platyplus/vue-rxdb-hasura'
import { Ref } from 'vue'

export const useProfile = (): Readonly<Ref<ContentsDocument | undefined>> =>
  useSingleton('users_me')
