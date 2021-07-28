import { clone } from 'rxdb'
import deepEqual from 'deep-equal'

import { TableFragment } from '../generated'
import { Metadata, MetadataCollection } from '../types'
import { isManyToManyTable } from '../contents'

export const modifier =
  (metadataCollection: MetadataCollection) =>
  async (doc: TableFragment): Promise<Metadata> => {
    // * Do not load many2many join tables
    if (isManyToManyTable(doc)) return null
    const oldDoc = await metadataCollection.findOne(doc.id).exec()
    if (!oldDoc) return doc
    const oldDocValues = clone(oldDoc.toJSON())
    delete oldDocValues['_deleted']
    // * Don't load metadata again if nothing changed list last time it has been put in the Rx database
    if (deepEqual(doc, oldDocValues)) return null
    return doc
  }
