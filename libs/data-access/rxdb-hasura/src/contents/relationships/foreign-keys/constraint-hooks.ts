import { getDocumentMetadata } from '../../../metadata'
import { Contents, ContentsCollection, ContentsDocument } from '../../../types'
import { metadataName } from '../../../utils'
import { findForeignKeyConstraint } from './utils'
/**
 * Events on forein keys:
 * a = no action
 * r = restrict
 * c = cascade
 * n = set null
 * d = set default
 */
// TODO review these hooks entirely
// TODO improve the way of accessing foreign keys, ideally metadata.relationships.{onUpdate,onDelete}
export const createForeignKeyConstraintsHooks = (
  collection: ContentsCollection
): void => {
  collection.preRemove(async (data: Contents, document: ContentsDocument) => {
    const metadata = getDocumentMetadata(document)
    for (const relationship of metadata.relationships) {
      const fk = findForeignKeyConstraint(metadata, relationship)
      if (fk) {
        const values = data[relationship.name]
        const remoteTable = `${collection.role}_${metadataName(
          relationship.remoteTable
        )}`
        // TODO many2many
        const remoteIds = relationship.type === 'object' ? [values] : values
        if (fk.onDelete === 'c') {
          // * Cascade delete
          await collection.database[remoteTable].bulkRemove(remoteIds)
        } else if (fk.onDelete === 'n') {
          // if (!isNullableRelationship(relationship)) throw Error(`Non nullable relationship ${metadata.id}.${relationship.name}`)
          // else console.log('TODO mirror relationship')
        }
        // TODO set null, no action, restrict, set default
        //   const relatedDocuments: ContentsDocument[] =
        //     await collection.database[remoteTable].findByIds(remoteIds)
      }
    }
  }, true)
}
