import Handlebars from 'handlebars'
import { getCollectionMetadata } from '../../../store'

import { Contents, ContentsDocument } from '../../../types'

export const computeTemplate = (doc: Contents, template = '{{id}}') => {
  const compiledTemplate = Handlebars.compile(template, { noEscape: true })
  return compiledTemplate(doc, { allowProtoPropertiesByDefault: true }) || ''
}

// ? Continue to generate labels with RxDB?
// * Pros: ability to sort/filter documents by label
// * Cons:
// *    - not part of the react store configuration system
// *    - as a result, must reload metadata - and eventually recompute the entire Rx collection entirely
export const documentLabel = (
  doc: Contents,
  collection: ContentsDocument['collection']
): string | null => {
  const metadata = getCollectionMetadata(collection)
  const template =
    metadata.config?.document_label || `{{${collection.schema.primaryPath}}}`
  const compiledTemplate = Handlebars.compile(template, { noEscape: true })
  return (
    compiledTemplate(doc, { allowProtoPropertiesByDefault: true }) || doc.id
  )
}
