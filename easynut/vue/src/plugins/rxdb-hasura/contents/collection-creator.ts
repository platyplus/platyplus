import { RxCollectionCreatorBase } from 'rxdb/dist/types/types'

import { toJsonSchema } from '../helpers'
import { Metadata } from '../types'
import { documentMethods } from './document-methods'

export const contentsCollectionCreator = (
  metadata: Metadata
): RxCollectionCreatorBase => {
  return {
    schema: toJsonSchema(metadata),
    statics: {},
    methods: documentMethods,
    options: { metadata }
  }
}
