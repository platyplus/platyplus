import { Tag, TagProps } from 'rsuite'

import { DocumentComponent } from './types'
import { useDocumentLabel } from '@platyplus/react-rxdb-hasura'

export const DocumentTag: DocumentComponent<TagProps> = ({
  document,
  edit,
  metadata,
  role,
  ...props
}) => {
  const [label] = useDocumentLabel(metadata, role, document)
  if (!document) return null
  return <Tag {...props}>{label}</Tag>
}
