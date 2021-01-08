import { Database } from '@platyplus/rxdb-hasura'
import { computed, ComputedRef, inject, Ref } from 'vue'

import { DefaultRxDBKey } from '../plugin'

export const useDB = (): ComputedRef<Database | undefined> => {
  const db = inject<Ref<Database | undefined>>(DefaultRxDBKey)
  return computed(() => {
    return db?.value
  })
}
