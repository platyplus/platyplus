import {
  ContentsCollection,
  ContentsDocument,
  ContentsDocumentMethods
} from '../types'

export const documentMethods: ContentsDocumentMethods = {
  canEdit(this: ContentsDocument, propertyName?: string) {
    const collection = this.collection as ContentsCollection // TODO write an issue or a PR in rxdb repo
    return this._isTemporary
      ? collection.canInsert(propertyName)
      : collection.canUpdate(propertyName)
  },
  canSave: () => {
    // TODO validate data
    // * check hasura permissions
    // * check SQL constraints
    return true
  },
  canDelete(this: ContentsDocument) {
    return this.canEdit('deleted')
  }
}
