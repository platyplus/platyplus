import { useDocumentLabel } from '@platyplus/react-rxdb-hasura'
import { DocumentComponent } from './types'

export const DocumentLabel: DocumentComponent = ({
  tableInfo,
  role,
  document
}) => {
  const [label] = useDocumentLabel(tableInfo, role, document)
  if (!document) return null
  return <span>{label}</span>
}
