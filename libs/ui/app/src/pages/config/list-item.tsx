import { useHistory } from 'react-router-dom'
import { List } from 'rsuite'

import { MetadataDocument, metadataName } from '@platyplus/rxdb-hasura'
import { useTableConfig } from '@platyplus/react-rxdb-hasura'

export const ConfigListItem: React.FC<{
  metadata: MetadataDocument
  index: number
}> = ({ metadata, index }) => {
  const name = metadataName(metadata)
  const history = useHistory()
  const [configTitle] = useTableConfig(metadata, 'title')
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
