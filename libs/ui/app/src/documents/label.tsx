import { useDocumentLabel } from '@platyplus/react-rxdb-hasura'
import { DocumentComponent } from './types'

export const DocumentLabel: DocumentComponent = ({
  tableinfo,
  role,
  document
}) => {
  const [label] = useDocumentLabel(tableinfo, role, document)
  if (!document) return null
  return <span>{label}</span>
}
