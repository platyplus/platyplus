import { useConfig } from '../config'

export const useCollectionTableConfig = <T>(
  tableId: string,
  path?: string,
  fallback?: T
): [T, (val: T) => void] => {
  return useConfig(tableId, path, fallback)
}
