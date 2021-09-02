import { clone } from 'rxdb'
import deepEqual from 'deep-equal'

import { MetadataCollection } from '../types'
import { TableFragment } from '../../generated'

export const modifier =
  (metadataCollection: MetadataCollection) =>
  async (doc: TableFragment): Promise<TableFragment> => {
    // * Do not load many2many join tables
    const oldDoc = await metadataCollection.findOne(doc.id).exec()
    if (!oldDoc) return doc
    const oldDocValues = clone(oldDoc.toJSON())
    delete oldDocValues['_deleted']
    // * Don't load metadata again if nothing changed list last time it has been put in the Rx database
    if (deepEqual(doc, oldDocValues)) return null
    return doc
  }
