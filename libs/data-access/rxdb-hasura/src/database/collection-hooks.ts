import { TopLevelProperty } from 'rxdb/dist/types/types'

import { debug } from '../console'
import { createContentReplicator, createHooks } from '../contents'
import { createMetadataReplicator, getCollectionMetadata } from '../metadata'
import { ContentsCollection, MetadataCollection } from '../types'
import { contentsCollections } from './helpers'
import { contents } from './observables'

const collectionProperties = (
  collection: ContentsCollection
): Map<string, TopLevelProperty> => {
  const schema = collection.schema
  const metadata = getCollectionMetadata(collection)
  const excludedProperties = [
    // * RxDB 'system' properties
    ...schema.topLevelFields.filter((value) => value.startsWith('_')),
    // * RxDB Hasura 'system' properties
    'updated_at',
    'created_at',
    'label',
    'is_local_change',
    // * array aggregates from the property list
    ...metadata.relationships
      .filter(({ type }) => type === 'array')
      .map(({ name }) => `${name}_aggregate`),
    // * primary key and other final fields as they can't be observed
    ...schema.finalFields.map((field) => field)
  ]

  return new Map(
    Object.entries(schema.jsonSchema.properties).filter(
      ([name]) => !excludedProperties.includes(name)
    )
  )
}

export const createRxCollection = async (
  collection: ContentsCollection
): Promise<void> => {
  if (collection.options.metadata) {
    // * Metadata option => this is a Contents collection
    collection.role = collection.options.role
    collection._tableId = collection.options.metadata.id
    debug(`create RxCollection ${collection.name}`)
    createHooks(collection)
    contents.next({
      ...contentsCollections(collection.database),
      [collection.name]: collection
    })
    await createContentReplicator(collection, collection.options.role)
  } else if (collection.options.isMetadataCollection) {
    // * isMetadata option => this is a Metadata collection
    await createMetadataReplicator(collection as unknown as MetadataCollection)
  }
}
