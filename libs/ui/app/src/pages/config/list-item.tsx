import { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { List } from 'rsuite'

import { Metadata, metadataName } from '@platyplus/rxdb-hasura'
import { useMetadataTitle } from '@platyplus/react-rxdb-hasura'

export const ConfigListItem: React.FC<{
  metadata: Metadata
  index: number
}> = ({ metadata, index }) => {
  const name = useMemo(() => metadataName(metadata), [metadata])
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
