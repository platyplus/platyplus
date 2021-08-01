import { useMemo } from 'react'

import { Contents, Metadata, metadataName } from '@platyplus/rxdb-hasura'
import { InlineValue } from '@platyplus/layout'

import { useCollectionTableConfig } from '../collection'

// * Document title e.g. 'Visite'. config.document_title="Visite" whereas config.title="Visits"
export const useDocumentTitle = (metadata: Metadata, document?: Contents) => {
  const name = useMemo(() => metadata && metadataName(metadata), [metadata])
  return useCollectionTableConfig<string>(
    document?.collection,
    'document_title',
    name
  )
}

export const DocumentTitle: React.FC<{
  metadata: Metadata
  document: Contents
  editable?: boolean
}> = ({ metadata, document, editable }) => {
  const [value, onChange] = useDocumentTitle(metadata, document)
  return <InlineValue editable={editable} value={value} onChange={onChange} />
}
