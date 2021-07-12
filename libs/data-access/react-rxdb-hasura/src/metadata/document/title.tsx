import { ContentsDocument, metadataName } from '@platyplus/rxdb-hasura'
import { InlineEditableValue } from '../../helpers'
import { useDocumentMetadata } from './hooks'

// * Document title e.g. 'Visite'. config.document_title="Visite" whereas config.title="Visits"
export const useDocumentTitle = (
  document: ContentsDocument
): [string, (val: string) => void] => {
  const setDocumentTitle = (newTitle: string) => {
    // TODO
    console.log(newTitle)
  }
  const metadata = useDocumentMetadata(document)
  const title = metadata
    ? metadata.config?.document_title ||
      metadata.config?.title ||
      metadataName(metadata)
    : document?.collection.name
  return [title, setDocumentTitle]
}

// TODO make it editable
export const DocumentTitle: React.FC<{
  document: ContentsDocument
}> = ({ document }) => {
  const state = useDocumentTitle(document)
  return <InlineEditableValue state={state} />
}
