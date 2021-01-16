import { ContentsCollection } from '../../types'
import {
  addComputedFieldsFromCollection,
  addComputedFieldsFromDoc
} from './utils'

export const createComputedFieldsHooks = (
  collection: ContentsCollection
): void => {
  collection.preInsert(addComputedFieldsFromCollection, false)
  collection.preSave(addComputedFieldsFromDoc, false)
}
