import Handlebars from 'handlebars'
import { TableConfigCollection, TABLE_CONFIG_TABLE } from '../../../metadata'
import { getCollectionTableInfo } from '../../../store'
import { Contents, ContentsCollection } from '../../../types'

export const computeTemplate = (doc: Contents, template = '{{id}}') => {
  const compiledTemplate = Handlebars.compile(template, { noEscape: true })
  return compiledTemplate(doc, { allowProtoPropertiesByDefault: true }) || ''
}

// ? Continue to generate labels with RxDB?
// * Pros: ability to sort/filter documents by label
// * Cons:
// *    - not part of the react store configuration system
// *    - as a result, must reload tableInfo - and eventually recompute the entire Rx collection entirely
export const documentLabel = async (
  doc: Contents,
  collection: ContentsCollection
): Promise<string | null> => {
  const tableInfo = getCollectionTableInfo(collection)
  const config = await (
    collection.database[TABLE_CONFIG_TABLE] as TableConfigCollection
  )
    .findOne(tableInfo.id)
    .exec()

  const template =
    config?.document_label || `{{${collection.schema.primaryPath}}}`
  const compiledTemplate = Handlebars.compile(template, { noEscape: true })
  return (
    compiledTemplate(doc, { allowProtoPropertiesByDefault: true }) || doc.id
  )
}
