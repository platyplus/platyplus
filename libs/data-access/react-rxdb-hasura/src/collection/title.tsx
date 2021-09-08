import { InlineValue } from '@platyplus/layout'
import { TableInformation, tableName } from '@platyplus/rxdb-hasura'
import { useMemo } from 'react'

import { useTableConfig } from '../config'

export const useCollectionTitle = (tableInfo?: TableInformation) => {
  const id = useMemo(() => tableInfo?.id, [tableInfo])
  const fallback = useMemo(() => tableInfo && tableName(tableInfo), [tableInfo])
  return useTableConfig<string>(id, 'title', fallback)
}

export const CollectionTitle: React.FC<{
  tableInfo?: TableInformation
  editable?: boolean
}> = ({ tableInfo, editable }) => {
  const [value, onChange] = useCollectionTitle(tableInfo)
  return <InlineValue editable={editable} value={value} onChange={onChange} />
}
