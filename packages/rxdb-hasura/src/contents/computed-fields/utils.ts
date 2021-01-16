import { RxCollectionHookCallback } from 'rxdb'

import {
  Contents,
  ContentsCollection,
  ContentsDocument,
  ContentsDocumentMethods
} from '../../types'
import { label } from './label'

export const addComputedFieldsFromCollection = (
  data: Contents,
  collection: ContentsDocument['collection']
): void => {
  data.label = label(data, collection) || ''
}

export const addComputedFieldsFromDoc: RxCollectionHookCallback<
  Contents,
  ContentsDocumentMethods
> = (data, doc) => {
  addComputedFieldsFromCollection(data, doc.collection as ContentsCollection)
}
