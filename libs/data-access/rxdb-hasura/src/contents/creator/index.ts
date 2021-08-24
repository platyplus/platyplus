import { RxCollectionCreator } from 'rxdb/dist/types/types'
import { Metadata } from '../../metadata'

import { toJsonSchema } from '../schema'

export const contentsCollectionCreator = (
  metadata: Metadata,
  role: string
): RxCollectionCreator => {
  return {
    schema: toJsonSchema(metadata, role),
    statics: {},
    methods: {},
    options: { tableId: metadata.id, role }
  }
}
