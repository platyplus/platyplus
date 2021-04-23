import { ContentsCollection } from '../../types'
import {
  addComputedFieldsFromCollection,
  addComputedFieldsFromDoc
} from './utils'

export const createComputedFieldsHooks = (
  collection: ContentsCollection
): void => {
  collection.preInsert(
    data => addComputedFieldsFromCollection(data, collection),
    false
  )
  collection.preSave(addComputedFieldsFromDoc, false)
}
