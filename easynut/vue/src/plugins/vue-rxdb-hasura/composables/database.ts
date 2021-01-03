import { RxDatabase } from 'rxdb'
import { computed, ComputedRef, inject, Ref } from 'vue'

import { DefaultRxDBKey } from '../plugin'

export const useDB = (): ComputedRef<RxDatabase | undefined> => {
  const db = inject<Ref<RxDatabase | undefined>>(DefaultRxDBKey)
  return computed(() => {
    return db?.value
  })
}
