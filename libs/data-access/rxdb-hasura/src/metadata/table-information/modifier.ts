import { clone } from 'rxdb'
import deepEqual from 'deep-equal'

import { TableInfoCollection } from '../types'
import { TableFragment } from '../../generated'

export const modifier =
  (tableInfoCollection: TableInfoCollection) =>
  async (doc: TableFragment): Promise<TableFragment> => {
    // * Do not load many2many join tables
    const oldDoc = await tableInfoCollection.findOne(doc.id).exec()
    if (!oldDoc) return doc
    const oldDocValues = clone(oldDoc.toJSON())
    delete oldDocValues['_deleted']
    // * Don't load tableInfo again if nothing changed list last time it has been put in the Rx database
    if (deepEqual(doc, oldDocValues)) return null
    return doc
  }
