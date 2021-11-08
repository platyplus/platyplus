import { debug, error, info } from '@platyplus/logger'

import { ForeignKey } from '../../../metadata/table-information/types'
import { Contents, ContentsCollection, ContentsDocument } from '../../../types'

import { generateDefaultValue } from '../../defaults'

import { foreignDocumentDependencies } from './dependencies'

export const createForeignKeyConstraintsHooks = (
  collection: ContentsCollection
): void => {
  collection.preRemove(async (data: Contents, document: ContentsDocument) => {
    info(collection.name, `createForeignKeyConstraintsHooks preRemove`)
    for (const {
      key: fk,
      property: remoteProperty,
      table: remoteTable,
      query
    } of foreignDocumentDependencies(document)) {
      const actions: Record<
        ForeignKey['delete_rule'],
        () => Promise<void> | void
      > = {
        CASCADE: async () => {
          debug(
            collection.name,
            `cascade delete ${fk.from}.${remoteProperty.name}`
          )
          await query.remove()
        },
        'NO ACTION': () => {
          // * throw error
          error(
            collection.name,
            `delete ${fk.from}.${remoteProperty.name}: no action`
          )
          throw Error()
        },
        RESTRICT: () => {
          // * throw error
          error(
            collection.name,
            `delete ${fk.from}.${remoteProperty.name}: restrict`
          )
          throw Error()
        },
        'SET DEFAULT': async () => {
          debug(
            collection.name,
            `delete ${fk.from}.${remoteProperty.name}: set default`
          )
          for (const doc of await query.exec()) {
            await doc.update({
              $set: {
                [remoteProperty.name]: generateDefaultValue(
                  remoteTable,
                  remoteProperty.name,
                  doc.toJSON()
                )
              }
            })
          }
        },
        'SET NULL': async () => {
          debug(
            collection.name,
            `delete ${fk.from}.${remoteProperty.name}: set null`
          )
          await query.update({
            $set: {
              [remoteProperty.name]: null
            }
          })
        }
      }
      await actions[fk.delete_rule]()
    }
  }, true)
}
