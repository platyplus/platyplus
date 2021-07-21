import { ContentsCollection, Database } from '../types'

export const contentsCollections = (
  db: Database
): Record<string, ContentsCollection> => {
  return Object.keys(db.collections)
    .filter((colName) => db.collections[colName].options.metadata)
    .reduce<Record<string, ContentsCollection>>((aggr, curr) => {
      aggr[curr] = db.collections[curr]
      return aggr
    }, {})
}
