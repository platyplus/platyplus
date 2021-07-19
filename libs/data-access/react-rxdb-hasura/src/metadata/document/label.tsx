import { useMemo } from 'react'

import { InlineValue } from '@platyplus/layout'
import { computeTemplate, ContentsDocument } from '@platyplus/rxdb-hasura'

import { useGetForm } from '../../modifications'
import { useCollectionTableConfig } from '../hooks'

export const useDocumentLabelTemplate = (document: ContentsDocument) =>
  useCollectionTableConfig<string>(document?.collection, 'document_label')

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
