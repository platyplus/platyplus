import { Database } from '../../types'
import { createCollection } from '../../utils'
import { TABLE_INFO_TABLE } from './constants'
import { tableInformationSettings } from '.'

export const addTableInfoCollection = async (db: Database) => {
  await createCollection(db, TABLE_INFO_TABLE, {
    schema: tableInformationSettings.schema,
    options: { isTableInfo: true, config: tableInformationSettings },
    autoMigrate: true
  })
}
