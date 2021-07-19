import { ContentsDocument, metadataName } from '@platyplus/rxdb-hasura'
import { InlineValue } from '@platyplus/layout'
import { useCollectionTableConfig } from '../hooks'

// * Document title e.g. 'Visite'. config.document_title="Visite" whereas config.title="Visits"
export const useDocumentTitle = (document: ContentsDocument) =>
  useCollectionTableConfig<string>(
    document?.collection,
    'document_title',
    (metadata) => metadataName(metadata)
  )

export const DocumentTitle: React.FC<{
  document: ContentsDocument
}> = ({ document }) => {
  const [value, onChange] = useDocumentTitle(document)
  return <InlineValue value={value} onChange={onChange} />
}
