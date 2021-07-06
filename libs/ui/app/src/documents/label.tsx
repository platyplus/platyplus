import { useHistory } from 'react-router-dom'
import { Table } from 'rsuite'

import { ContentsDocument } from '@platyplus/rxdb-hasura'

import { DocumentComponent } from './types'
import { useDocumentLabel } from '@platyplus/react-rxdb-hasura'

export const DocumentLabel: DocumentComponent = ({ document }) => {
  const label = useDocumentLabel(document)
  if (document) return <span>{label}</span>
  else return null
}
