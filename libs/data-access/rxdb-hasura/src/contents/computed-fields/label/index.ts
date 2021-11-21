import Handlebars from 'handlebars'
import {
  getCollectionTableInfo,
  TableConfigCollection,
  TableInformation,
  TABLE_CONFIG_TABLE
} from '../../../metadata'
import { Contents, ContentsCollection } from '../../../types'
import { SYSTEM_COLUMNS } from '../../columns'
import { tablePropertiesNames } from '../../properties'

export const computeTemplate = (doc: Contents, template: string) => {
  const compiledTemplate = Handlebars.compile(template, { noEscape: true })
  return compiledTemplate(doc, { allowProtoPropertiesByDefault: true }) || ''
}

export const defaultLabelTemplate = (tableInfo?: TableInformation) =>
  tableInfo?.primaryKey.columns.map((pk) => `{{${pk}}}`).join('.') || ''
// ? Continue to generate labels with RxDB?

// * Pros: ability to sort/filter/find documents by label
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
  const firstProperty = tablePropertiesNames(tableInfo).filter(
    (p) => !SYSTEM_COLUMNS.includes(p)
  )[0]
  const template =
    config?.document_label ||
    (firstProperty ? `{{${firstProperty}}}` : defaultLabelTemplate(tableInfo))
  const compiledTemplate = Handlebars.compile(template, { noEscape: true })
  return (
    compiledTemplate(doc, { allowProtoPropertiesByDefault: true }) || doc.id
  )
}
