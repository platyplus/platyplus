import Handlebars from 'handlebars'

import { TableFragment } from '../../../generated'
import { GenericDocument, GenericRxCollection } from '../types'

export const documentLabel = (
  doc: GenericDocument,
  collection: GenericRxCollection,
  table?: TableFragment
): string | null => {
  const template =
    table?.config?.label || `{{${collection.schema.primaryPath}}}`
  const compiledTemplate = Handlebars.compile(template, { noEscape: true })
  return compiledTemplate(doc, { allowProtoPropertiesByDefault: true }) || null
}
