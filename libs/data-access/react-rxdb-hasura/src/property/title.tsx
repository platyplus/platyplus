import { TableInformation } from '@platyplus/rxdb-hasura'
import { InlineValue } from '@platyplus/layout'

import { useCollectionPropertyConfig } from './hooks'

/** Use the title of a property, in this order:
 * 1. title stored in the config store
 * 2. title stored in the property configuration
 * 3. name of the property
 * The `setTitle` method will set a new title value to the config store
 * @return [title, setTitle]
 */
const usePropertyTitle = (tableinfo: TableInformation, property: string) =>
  useCollectionPropertyConfig(tableinfo, property, 'title', property)

export const PropertyTitle: React.FC<{
  tableinfo: TableInformation
  name: string
  editable?: boolean
}> = ({ tableinfo, name, editable }) => {
  const [value, setValue] = usePropertyTitle(tableinfo, name)
  return editable ? (
    <InlineValue editable={editable} value={value} onChange={setValue} />
  ) : (
    <span>{value}</span>
  )
}
