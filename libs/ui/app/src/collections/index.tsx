import { useComponentsContext } from '../components'
import { CollectionComponentsConfig } from '../types'

import ListCollection from './list'
import TableCollection from './table'
import { CollectionComponent } from './types'

export const defaultCollectionComponents: CollectionComponentsConfig = {
  default: TableCollection,
  table: TableCollection,
  list: ListCollection
}

export const useCollectionComponents = () => useComponentsContext().collections

export const CollectionComponentWrapper: CollectionComponent = ({
  collection,
  data,
  edit = false
}) => {
  const collectionComponents = useCollectionComponents()
  const componentName = collection.componentName()
  const Component = componentName && collectionComponents[componentName]
  if (Component)
    return <Component collection={collection} data={data} edit={edit} />
  else return <div>TODO: {componentName}</div>
}