import { clone } from 'rxdb'
import deepEqual from 'deep-equal'

import { TableFragment } from '../generated'
import { Metadata, MetadataCollection } from '../types'
import { isManyToManyTable } from '../contents'

export const modifier =
  (metadataCollection: MetadataCollection) =>
  async (doc: TableFragment): Promise<Metadata> => {
    const { propertiesConfig, ...metadata } = doc
    const newDoc = {
      ...metadata,
      propertiesConfig: propertiesConfig.reduce(
        (aggr, { property_name, ...config }) => {
          aggr[property_name] = config
          return aggr
        },
        {}
      )
    }

    // * Do not load many2many join tables
    if (isManyToManyTable(newDoc)) return null
    const oldDoc = await metadataCollection.findOne(doc.id).exec()
    if (!oldDoc) return newDoc
    const oldDocValues = clone(oldDoc.toJSON())
    delete oldDocValues['_deleted']
    // * Don't load metadata again if nothing changed list last time it has been put in the Rx database
    if (deepEqual(newDoc, oldDocValues)) return null
    return newDoc
  }
