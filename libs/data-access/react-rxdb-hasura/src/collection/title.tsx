import { InlineValue } from '@platyplus/layout'
import { TableInformation, tableName } from '@platyplus/rxdb-hasura'
import { useMemo } from 'react'

import { useTableConfig } from '../config'

export const useCollectionTitle = (tableinfo?: TableInformation) => {
  const id = useMemo(() => tableinfo?.id, [tableinfo])
  const fallback = useMemo(() => tableinfo && tableName(tableinfo), [tableinfo])
  const { state: title, setState: setTitle } = useTableConfig<string>(
    id,
    'title',
    fallback
  )
  return { title, setTitle }
}

export const useFullCollectionTitle = (tableInfo?: TableInformation) => {
  const { title: shortTitle, setTitle } = useCollectionTitle(tableInfo)
  const name = useMemo(() => tableName(tableInfo), [tableInfo])
  const title = shortTitle !== name ? `${shortTitle} (${name})` : name
  return { title, setTitle }
}

export const CollectionTitle: React.FC<{
  tableinfo?: TableInformation
  editable?: boolean
}> = ({ tableinfo, editable }) => {
  const { title, setTitle } = useCollectionTitle(tableinfo)
  return <InlineValue editable={editable} value={title} onChange={setTitle} />
}
