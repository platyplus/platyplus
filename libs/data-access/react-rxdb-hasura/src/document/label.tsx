import { useMemo } from 'react'

import { InlineValue } from '@platyplus/layout'
import {
  computeTemplate,
  ContentsDocument,
  defaultLabelTemplate,
  TableInformation
} from '@platyplus/rxdb-hasura'

import { useFormGet } from '../form'
import { useTableConfig } from '../config'
import { useTableProperties } from '../property'

export const useDocumentLabelTemplate = (
  tableInfo: TableInformation,
  role?: string
): [string, (val: string) => void] => {
  const [properties] = useTableProperties(tableInfo, { role })
  const { config: existingTemplate, setConfig: setTemplate } =
    useTableConfig<string>(tableInfo?.id, 'document_label')
  const template = useMemo(() => {
    if (existingTemplate) return existingTemplate
    const firstProperty = properties.keys().next().value
    return firstProperty
      ? `{{${firstProperty}}}`
      : defaultLabelTemplate(tableInfo)
  }, [tableInfo, existingTemplate, properties])
  return [template, setTemplate]
}

export const useDocumentLabel = (
  tableInfo: TableInformation,
  role: string,
  document: ContentsDocument
): [string, string, (val: string) => void] => {
  const [template, setTemplate] = useDocumentLabelTemplate(tableInfo, role)
  const form = useFormGet(tableInfo, role, document)

  const label = useMemo(
    () => form && computeTemplate(form, template),
    [form, template]
  )

  return [label, template, setTemplate]
}

export const DocumentLabel: React.FC<{
  tableinfo: TableInformation
  role: string
  document: ContentsDocument
  editable?: boolean
}> = ({ document, editable, role, tableinfo }) => {
  const [value, template, onChange] = useDocumentLabel(
    tableinfo,
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
