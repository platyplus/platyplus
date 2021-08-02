import { RxCollectionCreator } from 'rxdb/dist/types/types'
import { TableFragment } from '../../generated'

import { toJsonSchema } from '../schema'

export const contentsCollectionCreator = (
  metadata: TableFragment,
  role: string
): RxCollectionCreator => {
  return {
    schema: toJsonSchema(metadata, role),
    statics: {},
    methods: {},
    options: { metadata, role }
  }
}
