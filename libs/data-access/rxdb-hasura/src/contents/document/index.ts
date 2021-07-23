import { ContentsDocument, ContentsDocumentMethods } from '../../types'
import { systemDocumentComponent } from '../system'

// TODO remove from the prototype and move to ../schema/permissions.ts
export const documentMethods: ContentsDocumentMethods = {
  canEdit(this: ContentsDocument, propertyName?: string) {
    const collection = this.collection // TODO write an issue or a PR in rxdb repo
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
  },

  component(this: ContentsDocument, propertyName?: string) {
    if (propertyName) {
      const collection = this.collection
      const config = collection.metadata.propertiesConfig?.[propertyName]
      return config?.component || 'default'
    } else return systemDocumentComponent(this) || 'default'
  }
}
