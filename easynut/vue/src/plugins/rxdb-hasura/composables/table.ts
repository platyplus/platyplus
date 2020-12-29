import { computed, ComputedRef, inject, isRef, Ref } from 'vue'

import { TableFragment } from '../../../generated'
import { DefaultRxDBKey, RxDBHasuraPlugin } from '../plugin'

export const useTables = (): ComputedRef<Record<string, TableFragment>> => {
  const plugin = inject<RxDBHasuraPlugin>(DefaultRxDBKey)
  return computed(() => {
    if (!plugin?.tables) throw Error('useTables: no tables found')
    return plugin.tables.value
  })
}

export const useTable = (
  name: string | Ref<string>
): ComputedRef<TableFragment> => {
  const tables = useTables()
  return computed(() => {
    const tableName = isRef(name) ? name.value : name
    const table = tables.value[tableName]
    if (!table) throw Error(`useTable: table ${tableName} not found`)
    return table
  })
}
