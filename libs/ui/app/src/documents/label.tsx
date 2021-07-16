import { useDocumentLabel } from '@platyplus/react-rxdb-hasura'
import { DocumentComponent } from './types'

export const DocumentLabel: DocumentComponent = ({ document }) => {
  const [label] = useDocumentLabel(document)
  if (document) return <span>{label}</span>
  else return null
}
