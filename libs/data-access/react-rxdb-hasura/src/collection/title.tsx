import { InlineValue } from '@platyplus/layout'
import { TableInformation, tableName } from '@platyplus/rxdb-hasura'
import { useMemo } from 'react'

import { useTableConfig } from '../config'

export const useCollectionTitle = (tableinfo?: TableInformation) => {
  const id = useMemo(() => tableinfo?.id, [tableinfo])
  const fallback = useMemo(() => tableinfo && tableName(tableinfo), [tableinfo])
  return useTableConfig<string>(id, 'title', fallback)
}

export const CollectionTitle: React.FC<{
  tableinfo?: TableInformation
  editable?: boolean
}> = ({ tableinfo, editable }) => {
  const { config, setConfig } = useCollectionTitle(tableinfo)
  return <InlineValue editable={editable} value={config} onChange={setConfig} />
}
