import { Link, useHistory } from 'react-router-dom'
import { Tag, TagProps } from 'rsuite'

import { useDocumentLabel } from '@platyplus/react-rxdb-hasura'

import { DocumentComponent } from './types'

export const DocumentTag: DocumentComponent<TagProps> = ({
  document,
  edit,
  tableinfo,
  role,
  ...props
}) => {
  const [label] = useDocumentLabel(tableinfo, role, document)
  const router = useHistory()
  if (!document) return null
  const nav = () => {
    !edit && router.push(`/collections/${role}/${tableinfo.id}/${document.id}`)
  }

  return (
    <Tag
      style={
        edit
          ? {}
          : {
              cursor: 'pointer'
            }
      }
      onClick={nav}
      {...props}
    >
      {label}
    </Tag>
  )
}
