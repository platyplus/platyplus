import { Tag, TagProps } from 'rsuite'

import { DocumentComponent } from './types'
import { useDocumentLabel } from '@platyplus/react-rxdb-hasura'

export const DocumentTag: DocumentComponent<TagProps> = ({
  document,
  edit,
  tableinfo,
  role,
  ...props
}) => {
  const [label] = useDocumentLabel(tableinfo, role, document)
  if (!document) return null

  return (
    <Tag {...props}>
      {label}
      {/* <Link
        to={`/collections/${role}/${tableinfo.id}/${document.id}`}
        style={{ textDecoration: 'none' }}
      >
        {label}
      </Link> */}
    </Tag>
  )
}
