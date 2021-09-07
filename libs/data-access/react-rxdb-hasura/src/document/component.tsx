import { useTableConfig } from '../config'

export const useDocumentComponentName = (tableId: string) =>
  useTableConfig(tableId, 'document_component', 'default')
