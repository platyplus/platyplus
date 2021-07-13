import { useCallback } from 'react'
import { ContentsDocument, metadataName } from '@platyplus/rxdb-hasura'
import { InlineEditableValue } from '../../helpers'
import { useConfigStore } from '../store'
import { useDocumentMetadata } from './hooks'

// * Document title e.g. 'Visite'. config.document_title="Visite" whereas config.title="Visits"
export const useDocumentTitle = (
  document: ContentsDocument
): [string, (val: string) => void] => {
  const metadata = useDocumentMetadata(document)
  const title = useConfigStore(
    useCallback(
      (state) =>
        state.getConfig(metadata)?.document_title ||
        (metadata && metadataName(metadata)),
      [metadata]
    )
  )

  const setTitle = useConfigStore(
    (state) => (newTitle: string) =>
      state.setConfig(metadata, newTitle, 'document_title')
  )
  return [title, setTitle]
}

export const DocumentTitle: React.FC<{
  document: ContentsDocument
}> = ({ document }) => {
  const state = useDocumentTitle(document)
  return <InlineEditableValue state={state} />
}
