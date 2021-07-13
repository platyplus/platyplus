import { useCallback } from 'react'
import { RxCollection } from 'rxdb'
import { InlineEditableValue } from '../../helpers'
import { useCollectionMetadata } from '../collection'
import { useConfigStore } from '../store'

/** Use the title of a property, in this order:
 * 1. title stored in the config store
 * 2. title stored in the metadata property configuration
 * 3. name of the property
 * The `setTitle` method will set a new title value to the config store
 * @return [title, setTitle]
 */
const usePropertyTitle = (
  collection: RxCollection,
  property: string
): [string, (val: string) => void] => {
  const metadata = useCollectionMetadata(collection)
  const title = useConfigStore(
    useCallback(
      (state) =>
        state.getProperty<string>(metadata, property, 'title') || property,
      [metadata, property]
    )
  )
  const setTitle = useConfigStore(
    (state) => (newTitle: string) =>
      state.setProperty(metadata, property, newTitle, 'title')
  )
  return [title, setTitle]
}

export const PropertyTitle: React.FC<{
  collection: RxCollection
  property: string
}> = ({ collection, property }) => {
  const state = usePropertyTitle(collection, property)
  return <InlineEditableValue state={state} />
}
