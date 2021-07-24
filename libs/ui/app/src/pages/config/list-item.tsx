import { useHistory } from 'react-router-dom'
import { List } from 'rsuite'

import { MetadataDocument, metadataName } from '@platyplus/rxdb-hasura'

export const ConfigListItem: React.FC<{
  metadata: MetadataDocument
  index: number
}> = ({ metadata, index }) => {
  const name = metadataName(metadata)
  const history = useHistory()

  const title = metadata.config?.title
    ? `${metadata.config?.title} (${name})`
    : name

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
