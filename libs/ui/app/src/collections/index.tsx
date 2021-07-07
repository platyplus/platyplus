import { Loading } from '@platyplus/navigation'
import {
  useContentsCollection,
  useDocuments
} from '@platyplus/react-rxdb-hasura'
import { useComponentsContext } from '../components'
import { CollectionComponentsConfig } from '../types'

import { CollectionComponent, CollectionFromParamsComponent } from './types'
import { LabelCollection } from './label'
import { ListCollection } from './list'
import { TableCollection } from './table'

export const defaultCollectionComponents: CollectionComponentsConfig = {
  default: TableCollection,
  label: LabelCollection,
  table: TableCollection,
  list: ListCollection
}

export const useCollectionComponents = () => useComponentsContext().collections

export const CollectionComponentWrapper: CollectionComponent<{
  componentName?: string
}> = ({
  collection,
  data,
  edit = false,
  componentName = collection.componentName()
}) => {
  const collectionComponents = useCollectionComponents()
  const Component = componentName && collectionComponents[componentName]
  if (Component)
    return <Component collection={collection} data={data} edit={edit} />
  else return <div>TODO: {componentName}</div>
}

export const CollectionFromParamsComponentWrapper: CollectionFromParamsComponent =
  ({ collectionName, componentName, ids, edit = false }) => {
    const collection = useContentsCollection(collectionName)
    const { isFetching, result } = useDocuments(collectionName, ids)
    if (isFetching) return <Loading />
    else
      return (
        <CollectionComponentWrapper
          collection={collection}
          data={result}
          edit={edit}
          componentName={componentName}
        />
      )
  }
