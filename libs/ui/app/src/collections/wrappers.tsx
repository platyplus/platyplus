import {
  useCollectionComponentName,
  useContentsCollection,
  useDocuments
} from '@platyplus/react-rxdb-hasura'
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import { useMemo } from 'react'

import { useComponentsContext } from '../components'
import { CollectionComponent, CollectionFromParamsComponent } from './types'

export const CollectionComponentWrapper: CollectionComponent<{
  componentName?: string
}> = ({ collection, edit = false, componentName, ...rest }) => {
  const [collectionComponentName] = useCollectionComponentName(collection)
  const name = useMemo(
    () => componentName || collectionComponentName,
    [componentName, collectionComponentName]
  )
  const context = useComponentsContext()
  const collectionComponents = useMemo(() => context.collections, [context])
  const Component = useMemo(
    () => name && collectionComponents[name],
    [name, collectionComponents]
  )
  if (Component)
    return <Component collection={collection} edit={edit} {...rest} />
  else return <div>TODO: {name}</div>
}

export const CollectionFromParamsComponentWrapper: CollectionFromParamsComponent =
  ({ collectionName, ids, ...rest }) => {
    const collection = useContentsCollection(collectionName)
    const { result } = useDocuments(collectionName, ids)
    if (collection)
      return (
        <CollectionComponentWrapper
          collection={collection}
          data={result as ContentsDocument[]}
          {...rest}
        />
      )
    else return null
  }
