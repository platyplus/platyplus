import { useMemo } from 'react'

import { InlineValue } from '@platyplus/layout'
import {
  computeTemplate,
  ContentsDocument,
  TableInformation
} from '@platyplus/rxdb-hasura'

import { useFormGet } from '../form'
import { useCollectionTableConfig } from '../collection'

export const useDocumentLabelTemplate = (tableInfo: TableInformation) =>
  useCollectionTableConfig<string>(tableInfo.id, 'document_label')

export const useDocumentLabel = (
  tableInfo: TableInformation,
  role: string,
  document: ContentsDocument
): [string, string, (val: string) => void] => {
  const [template, setTemplate] = useDocumentLabelTemplate(tableInfo)
  const form = useFormGet(tableInfo, role, document)

  const label = useMemo(
    () => form && template && computeTemplate(form, template),
    [form, template]
  )

  return [label, template, setTemplate]
}

export const DocumentLabel: React.FC<{
  tableInfo: TableInformation
  role: string
  document: ContentsDocument
  editable?: boolean
}> = ({ document, editable, role, tableInfo }) => {
  const [value, template, onChange] = useDocumentLabel(
    tableInfo,
    role,
    document
  )
  return (
    <InlineValue
      editable={editable}
      value={template}
      label={value}
      onChange={onChange}
    />
  )
}
