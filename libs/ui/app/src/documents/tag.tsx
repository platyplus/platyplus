import { Tag, TagProps } from 'rsuite'

import { DocumentComponent } from './types'
import { useDocumentLabel } from '@platyplus/react-rxdb-hasura'

export const DocumentTag: DocumentComponent<TagProps> = ({
  document,
  edit,
  tableInfo,
  role,
  ...props
}) => {
  const [label] = useDocumentLabel(tableInfo, role, document)
  if (!document) return null

  return (
    <Tag {...props}>
      {label}
      {/* <Link
        to={`/collection/${role}/${tableInfo.id}/${document.id}`}
        style={{ textDecoration: 'none' }}
      >
        {label}
      </Link> */}
    </Tag>
  )
}
