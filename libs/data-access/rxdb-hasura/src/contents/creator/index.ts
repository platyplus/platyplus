import { RxCollectionCreator } from 'rxdb/dist/types/types'

import { Metadata } from '../../types'
import { collectionMethods } from '../collection'
import { documentMethods } from '../document'
import { toJsonSchema } from '../schema'

export const contentsCollectionCreator = (
  metadata: Metadata,
  role: string
): RxCollectionCreator => {
  return {
    schema: toJsonSchema(metadata, role),
    statics: collectionMethods,
    methods: documentMethods,
    options: { metadata, role }
  }
}
