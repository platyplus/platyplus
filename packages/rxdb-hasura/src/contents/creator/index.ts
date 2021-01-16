import { RxCollectionCreatorBase } from 'rxdb/dist/types/types'

import { toJsonSchema } from '../../helpers'
import { Metadata } from '../../types'
import { collectionMethods } from '../collection'
import { documentMethods } from '../document'

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
