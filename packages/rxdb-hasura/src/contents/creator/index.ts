import { RxCollectionCreatorBase } from 'rxdb/dist/types/types'

import { Metadata } from '../../types'
import { collectionMethods } from '../collection'
import { documentMethods } from '../document'
import { toJsonSchema } from '../schema'

export const contentsCollectionCreator = (
  metadata: Metadata
): RxCollectionCreatorBase => {
  return {
    schema: toJsonSchema(metadata),
    statics: collectionMethods,
    methods: documentMethods,
    options: { metadata }
  }
}
