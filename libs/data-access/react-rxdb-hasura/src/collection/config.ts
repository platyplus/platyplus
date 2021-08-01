import { useMetadataConfig } from '../config'

export const useCollectionTableConfig = <T>(
  tableId: string,
  path?: string,
  fallback?: T
): [T, (val: T) => void] => {
  return useMetadataConfig(tableId, path, fallback)
}
