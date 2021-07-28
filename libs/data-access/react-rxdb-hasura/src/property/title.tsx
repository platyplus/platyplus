import { ContentsCollection } from '@platyplus/rxdb-hasura'
import { InlineValue } from '@platyplus/layout'

import { useCollectionPropertyConfig } from './hooks'

/** Use the title of a property, in this order:
 * 1. title stored in the config store
 * 2. title stored in the metadata property configuration
 * 3. name of the property
 * The `setTitle` method will set a new title value to the config store
 * @return [title, setTitle]
 */
const usePropertyTitle = (collection: ContentsCollection, property: string) =>
  useCollectionPropertyConfig(collection, property, 'title', property)

export const PropertyTitle: React.FC<{
  collection: ContentsCollection
  property: string
  editable?: boolean
}> = ({ collection, property, editable }) => {
  const [value, setValue] = usePropertyTitle(collection, property)
  return editable ? (
    <InlineValue editable={editable} value={value} onChange={setValue} />
  ) : (
    <span>{value}</span>
  )
}
