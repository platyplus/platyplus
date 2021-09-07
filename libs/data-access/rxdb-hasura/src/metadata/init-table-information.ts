import { RxDatabase } from 'rxdb'
import { setCollectionIsReady } from '../store'
import { tableInformationSettings } from './table-information'
import { TABLE_INFO_TABLE } from './utils'

export const addTableInfoCollection = async (db: RxDatabase) => {
  await db.addCollections({
    [TABLE_INFO_TABLE]: {
      schema: tableInformationSettings.schema,
      options: { isTableInfo: true, config: tableInformationSettings },
      autoMigrate: true
    }
  })
  setCollectionIsReady(TABLE_INFO_TABLE)
}
