import { isRxDocument } from 'rxdb'

import {
  ContentsCollection,
  ContentsDocument,
  ContentsDocumentMethods
} from '../types'

export const documentMethods: ContentsDocumentMethods = {
  canEdit(this: ContentsDocument) {
    const collection = this.collection as ContentsCollection // TODO write an issue or a PR in rxdb repo
    // TODO

    console.log(collection.metadata.canInsert_aggregate.aggregate?.count)

    return isRxDocument(this)
      ? !!collection.metadata.canUpdate_aggregate.aggregate?.count
      : !!collection.metadata.canInsert_aggregate.aggregate?.count
  },
  canSave: () => true // TODO
}
