import { ContentsCollection, Database } from '../types'

export const hasuraCollections = (
  db: Database
): Record<string, ContentsCollection> =>
  Object.keys(db.collections)
    .filter(colName => db.collections[colName].options.metadata)
    .reduce<Record<string, ContentsCollection>>(
      (aggr, curr) => ((aggr[curr] = db.collections[curr]), aggr),
      {}
    )
