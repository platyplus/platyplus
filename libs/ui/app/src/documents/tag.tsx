import { Tag, TagProps } from 'rsuite'

import { DocumentComponent } from './types'
import { useDocumentLabel } from '@platyplus/react-rxdb-hasura'

export const DocumentTag: DocumentComponent<TagProps> = ({
  document,
  edit,
  ...props
}) => {
  const [label] = useDocumentLabel(document)
  if (document) return <Tag {...props}>{label}</Tag>
  else return null
}
