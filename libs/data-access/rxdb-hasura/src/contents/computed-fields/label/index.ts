import Handlebars from 'handlebars'

import { Contents, ContentsDocument } from '../../../types'

export const computeTemplate = (doc: Contents, template = '{{id}}') => {
  const compiledTemplate = Handlebars.compile(template, { noEscape: true })
  return (
    compiledTemplate(doc, { allowProtoPropertiesByDefault: true }) || doc.id
  )
}

export const documentLabel = (
  doc: Contents,
  collection: ContentsDocument['collection']
): string | null => {
  const template =
    collection.metadata.config?.document_label ||
    `{{${collection.schema.primaryPath}}}`
  const compiledTemplate = Handlebars.compile(template, { noEscape: true })
  return (
    compiledTemplate(doc, { allowProtoPropertiesByDefault: true }) || doc.id
  )
}
