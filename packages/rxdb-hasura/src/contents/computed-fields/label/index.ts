import Handlebars from 'handlebars'

import { Contents, ContentsDocument } from '../../../types'

export const label = (
  doc: Contents,
  collection: ContentsDocument['collection']
): string | null => {
  const template =
    collection.metadata.config?.document_label ||
    `{{${collection.schema.primaryPath}}}`
  const compiledTemplate = Handlebars.compile(template, { noEscape: true })
  return compiledTemplate(doc, { allowProtoPropertiesByDefault: true }) || null
}
