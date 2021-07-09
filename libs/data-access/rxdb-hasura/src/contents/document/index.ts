import {
  ContentsCollection,
  ContentsDocument,
  ContentsDocumentMethods
} from '../../types'
import { systemDocumentComponent } from '../system'
import { propertyType } from './property-type'
export * from './property-type'

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
  },

  component(this: ContentsDocument, propertyName?: string) {
    if (propertyName) {
      const collection = this.collection as ContentsCollection
      const config = collection.metadata.propertiesConfig.find(
        (config) => config.property_name === propertyName
      )
      return config?.component || 'default'
    } else return systemDocumentComponent(this) || 'default'
  },
  propertyType(this: ContentsDocument, propertyName: string) {
    return propertyType(this, propertyName)
  }
}
