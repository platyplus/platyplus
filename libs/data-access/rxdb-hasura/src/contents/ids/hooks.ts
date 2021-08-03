import { v4 as uuid } from 'uuid'
import { ContentsCollection } from '../../types'

export const createIdHooks = (collection: ContentsCollection): void => {
  collection.postCreate((data) => {
    // TODO composite keys
    const primaryPath = collection.schema.primaryPath
    if (!data[primaryPath]) {
      data[primaryPath] = uuid()
    }
  })
}
