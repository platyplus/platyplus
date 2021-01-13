import { isRxDocument } from 'rxdb'

import {
  ContentsCollection,
  ContentsDocument,
  ContentsDocumentMethods
} from '../types'

export const documentMethods: ContentsDocumentMethods = {
  canEdit(this: ContentsDocument, propertyName?: string) {
    const collection = this.collection as ContentsCollection // TODO write an issue or a PR in rxdb repo
    return isRxDocument(this)
      ? collection.canUpdate(propertyName)
      : collection.canInsert(propertyName)
  },
  canSave: () => {
    // TODO validate data
    // * check hasura permissions
    // * check SQL constraints
    return true
  }
}
