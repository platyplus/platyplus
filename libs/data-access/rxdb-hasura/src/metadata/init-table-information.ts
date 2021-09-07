import { Database } from '../types'
import { tableInformationSettings } from './table-information'
import { TABLE_INFO_TABLE } from './utils'

export const addTableInfoCollection = async (db: Database) => {
  await db.addCollections({
    [TABLE_INFO_TABLE]: {
      schema: tableInformationSettings.schema,
      options: { isTableInfo: true, config: tableInformationSettings },
      autoMigrate: true
    }
  })
}
