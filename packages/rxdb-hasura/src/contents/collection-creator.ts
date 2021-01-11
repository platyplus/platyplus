import { RxCollectionCreatorBase } from 'rxdb/dist/types/types'

import { toJsonSchema } from '../helpers'
import { Metadata } from '../types'
import { collectionMethods } from './collection-methods'
import { documentMethods } from './document-methods'

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
