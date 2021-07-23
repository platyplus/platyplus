import { useMemo } from 'react'

import { InlineValue } from '@platyplus/layout'
import { computeTemplate, ContentsDocument } from '@platyplus/rxdb-hasura'

import { useFormGet } from '../../form'
import { useCollectionTableConfig } from '../hooks'

export const useDocumentLabelTemplate = (document: ContentsDocument) =>
  useCollectionTableConfig<string>(document?.collection, 'document_label')

export const useDocumentLabel = (
  document: ContentsDocument
): [string, string, (val: string) => void] => {
  const [template, setTemplate] = useDocumentLabelTemplate(document)
  const form = useFormGet(document)

  const label = useMemo(
    () => form && template && computeTemplate(form, template),
    [form, template]
  )

  return [label, template, setTemplate]
}

export const DocumentLabel: React.FC<{
  document: ContentsDocument
}> = ({ document }) => {
  const [value, template, onChange] = useDocumentLabel(document)
  return <InlineValue value={template} label={value} onChange={onChange} />
}
