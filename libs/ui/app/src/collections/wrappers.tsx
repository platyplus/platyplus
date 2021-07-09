import { Loading } from '@platyplus/navigation'
import {
  useContentsCollection,
  useDocuments
} from '@platyplus/react-rxdb-hasura'
import { useComponentsContext } from '../components'

import { CollectionComponent, CollectionFromParamsComponent } from './types'

export const CollectionComponentWrapper: CollectionComponent<{
  componentName?: string
}> = ({
  collection,
  data,
  edit = false,
  componentName = collection.component()
}) => {
  const collectionComponents = useComponentsContext().collections
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
