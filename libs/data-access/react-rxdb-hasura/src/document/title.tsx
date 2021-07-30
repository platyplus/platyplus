import { useMemo } from 'react'

import { ContentsDocument, metadataName } from '@platyplus/rxdb-hasura'
import { InlineValue } from '@platyplus/layout'

import { useCollectionMetadata, useCollectionTableConfig } from '../collection'

// * Document title e.g. 'Visite'. config.document_title="Visite" whereas config.title="Visits"
export const useDocumentTitle = (document?: ContentsDocument) => {
  const metadata = useCollectionMetadata(document?.collection)
  const name = useMemo(() => metadata && metadataName(metadata), [metadata])
  return useCollectionTableConfig<string>(
    document?.collection,
    'document_title',
    name
  )
}

export const DocumentTitle: React.FC<{
  document: ContentsDocument
  editable?: boolean
}> = ({ document, editable }) => {
  const [value, onChange] = useDocumentTitle(document)
  return <InlineValue editable={editable} value={value} onChange={onChange} />
}
