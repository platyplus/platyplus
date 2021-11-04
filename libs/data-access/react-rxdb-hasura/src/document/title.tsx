import { useMemo } from 'react'

import { Contents, TableInformation, tableName } from '@platyplus/rxdb-hasura'
import { InlineValue } from '@platyplus/layout'
import { useTableConfig } from '../config'

// * Document title e.g. 'Visite'. config.document_title="Visite" whereas config.title="Visits"
export const useDocumentTitle = (
  tableInfo: TableInformation,
  document?: Contents
) => {
  const name = useMemo(() => tableInfo && tableName(tableInfo), [tableInfo])
  return useTableConfig<string>(tableInfo?.id, 'document_title', name)
}

export const DocumentTitle: React.FC<{
  tableinfo: TableInformation
  document: Contents
  editable?: boolean
}> = ({ tableinfo, document, editable }) => {
  const { config, setConfig } = useDocumentTitle(tableinfo, document)
  return <InlineValue editable={editable} value={config} onChange={setConfig} />
}
