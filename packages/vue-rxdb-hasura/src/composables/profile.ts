import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { useSingleton } from '@platyplus/vue-rxdb-hasura'
import { Ref } from 'vue'

export const useProfile = (): Readonly<Ref<ContentsDocument | undefined>> =>
  useSingleton('me_users')
