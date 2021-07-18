import { useCallback, useMemo } from 'react'

import { InlineValue } from '@platyplus/layout'
import { computeTemplate, ContentsDocument } from '@platyplus/rxdb-hasura'

import { useGetForm } from '../../modifications'
import { useDocumentMetadata } from './hooks'
import { useConfigStore } from '../store'

export const useDocumentLabelTemplate = (
  document: ContentsDocument
): [string | undefined, (val: string) => void] => {
  const metadata = useDocumentMetadata(document)
  const template = useConfigStore<string>(
    useCallback(
      (state) => state.getTable(metadata, 'document_label'),
      [metadata]
    )
  )
  const setTemplate = useConfigStore(
    (state) => (newTitle: string) =>
      state.setTable(metadata, newTitle, 'document_label')
  )
  return [template, setTemplate]
}

export const useDocumentLabel = (
  document: ContentsDocument
): [string, string, (val: string) => void] => {
  const [template, setTemplate] = useDocumentLabelTemplate(document)
  const values = useGetForm(document)

  const label = useMemo(
    () => values && template && computeTemplate(values, template),
    [values, template]
  )

  return [label, template, setTemplate]
}

export const DocumentLabel: React.FC<{
  document: ContentsDocument
}> = ({ document }) => {
  const [value, template, onChange] = useDocumentLabel(document)
  return <InlineValue value={template} label={value} onChange={onChange} />
}
