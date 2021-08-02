import { useMemo } from 'react'

import { InlineValue } from '@platyplus/layout'
import {
  computeTemplate,
  ContentsDocument,
  Metadata
} from '@platyplus/rxdb-hasura'

import { useFormGet } from '../form'
import { useCollectionTableConfig } from '../collection'

export const useDocumentLabelTemplate = (metadata: Metadata) =>
  useCollectionTableConfig<string>(metadata.id, 'document_label')

export const useDocumentLabel = (
  metadata: Metadata,
  role: string,
  document: ContentsDocument
): [string, string, (val: string) => void] => {
  const [template, setTemplate] = useDocumentLabelTemplate(metadata)
  const form = useFormGet(metadata, role, document)

  const label = useMemo(
    () => form && template && computeTemplate(form, template),
    [form, template]
  )

  return [label, template, setTemplate]
}

export const DocumentLabel: React.FC<{
  metadata: Metadata
  role: string
  document: ContentsDocument
  editable?: boolean
}> = ({ document, editable, role, metadata }) => {
  const [value, template, onChange] = useDocumentLabel(metadata, role, document)
  return (
    <InlineValue
      editable={editable}
      value={template}
      label={value}
      onChange={onChange}
    />
  )
}
