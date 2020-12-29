import { computed, ComputedRef, inject } from 'vue'

import { RxHasuraDatabase } from '../database'
import { DefaultRxDBKey, RxDBHasuraPlugin } from '../plugin'

export const useDB = (): ComputedRef<RxHasuraDatabase> => {
  const plugin = inject<RxDBHasuraPlugin>(DefaultRxDBKey)
  return computed(() => {
    if (!plugin?.db.value) throw Error('useDb: database not found')
    return plugin?.db.value
  })
}
