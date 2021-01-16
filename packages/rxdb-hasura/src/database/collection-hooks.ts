import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'

import { info } from '../console'
import { createContentReplicator, createHooks } from '../contents'
import { ContentsCollection } from '../types'
import { hasuraCollections } from './helpers'
import { hasura } from './observables'

const collectionProperties = (
  collection: ContentsCollection
): Map<string, TopLevelProperty | PrimaryProperty> => {
  const schema = collection.schema
  const excludedProperties = [
    // * 'system' properties
    '_rev',
    '_attachments',
    'updated_at',
    'label',
    // * array aggregates from the property list
    ...collection.metadata.relationships
      .filter(({ rel_type }) => rel_type === 'array')
      .map(({ rel_name }) => `${rel_name}_aggregate`),
    // * primary key and other final fields as they can't be observed
    ...schema.finalFields.map(field => field)
  ]

  return new Map(
    Object.entries(schema.jsonSchema.properties)
      .filter(([name]) => !excludedProperties.includes(name))
      // TODO sort
      .sort()
  )
}

export const createRxCollection = async (
  collection: ContentsCollection
): Promise<void> => {
  if (collection.options.metadata) {
    collection.metadata = collection.options.metadata
    collection.properties = collectionProperties(collection)
    await createContentReplicator(collection)
    info(`create RxCollection ${collection.name}`)
    createHooks(collection)
    hasura.next({
      ...hasuraCollections(collection.database),
      [collection.name]: collection
    })
  }
}
