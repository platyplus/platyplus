import { useDocumentLabel } from '@platyplus/react-rxdb-hasura'
import { DocumentComponent } from './types'

export const DocumentLabel: DocumentComponent = ({
  metadata,
  role,
  document
}) => {
  const [label] = useDocumentLabel(metadata, role, document)
  if (!document) return null
  return <span>{label}</span>
}
