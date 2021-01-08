import Handlebars from 'handlebars'

import { Contents, ContentsCollection } from '../types'

export const documentLabel = (
  doc: Contents,
  collection: ContentsCollection
): string | null => {
  const template =
    collection.metadata.config?.label || `{{${collection.schema.primaryPath}}}`
  const compiledTemplate = Handlebars.compile(template, { noEscape: true })
  return compiledTemplate(doc, { allowProtoPropertiesByDefault: true }) || null
}
