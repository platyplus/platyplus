import React from 'react'
import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'

type CommonCollectionComponentProps = {
  edit: boolean
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type CollectionComponent<T = {}> = React.FC<
  T &
    CommonCollectionComponentProps & {
      collection: ContentsCollection
      data: ContentsDocument[]
    }
>

export type CollectionFromParamsComponent = React.FC<
  CommonCollectionComponentProps & {
    componentName: string
    collectionName: string
    ids: string[]
  }
>
