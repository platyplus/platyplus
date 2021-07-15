import {
  useCollectionComponentName,
  useContentsCollection,
  useDocuments
} from '@platyplus/react-rxdb-hasura'
import { useComponentsContext } from '../components'
import { CollectionComponent, CollectionFromParamsComponent } from './types'

export const CollectionComponentWrapper: CollectionComponent<{
  componentName?: string
}> = ({ collection, data, edit = false, componentName }) => {
  const collectionComponentName = useCollectionComponentName(collection)
  const name = componentName || collectionComponentName
  const collectionComponents = useComponentsContext().collections
  const Component = name && collectionComponents[name]
  if (Component)
    return <Component collection={collection} data={data} edit={edit} />
  else return <div>TODO: {name}</div>
}

export const CollectionFromParamsComponentWrapper: CollectionFromParamsComponent =
  ({ collectionName, componentName, ids, edit = false }) => {
    const collection = useContentsCollection(collectionName)
    const { result } = useDocuments(collectionName, ids)
    return (
      <CollectionComponentWrapper
        collection={collection}
        data={result}
        edit={edit}
        componentName={componentName}
      />
    )
  }
