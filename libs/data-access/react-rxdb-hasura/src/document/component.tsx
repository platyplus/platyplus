import { useCollectionTableConfig } from '../collection'

export const useDocumentComponentName = (tableId: string) =>
  useCollectionTableConfig(tableId, 'document_component', 'default')
