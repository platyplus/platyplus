import Handlebars from 'handlebars'

import { GenericDocument, GenericRxCollection } from '../types'

export const documentLabel = (
  doc: GenericDocument,
  collection: GenericRxCollection
): string | null => {
  const template =
    collection.metadata.config?.label || `{{${collection.schema.primaryPath}}}`
  const compiledTemplate = Handlebars.compile(template, { noEscape: true })
  return compiledTemplate(doc, { allowProtoPropertiesByDefault: true }) || null
}
