import { useHistory } from 'react-router-dom'
import { List } from 'rsuite'

import {
  ContentsCollection,
  Metadata,
  metadataName
} from '@platyplus/rxdb-hasura'
import {
  useMetadataStore,
  useMetadataTitle
} from '@platyplus/react-rxdb-hasura'

import { useCallback, useMemo } from 'react'

const useCollectionMetadata = (
  collection?: ContentsCollection
): Readonly<Metadata | null> =>
  useMetadataStore(
    useCallback(
      (store) => collection && store.tables[collection.tableId],
      [collection]
    )
  )

export const ConfigListItem: React.FC<{
  collection: ContentsCollection
  index: number
}> = ({ collection, index }) => {
  const metadata = useCollectionMetadata(collection)
  const name = useMemo(() => metadata && metadataName(metadata), [metadata])
  const history = useHistory()
  const [configTitle] = useMetadataTitle(metadata)
  const title = configTitle ? `${configTitle} (${name})` : name
  return (
    <List.Item
      index={index}
      style={{
        cursor: 'pointer'
      }}
      onClick={() => {
        history.push(`/config/${metadata.id}`)
      }}
    >
      <span>{title}</span>
    </List.Item>
  )
}
