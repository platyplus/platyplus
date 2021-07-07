import { Contents, ContentsCollection } from '@platyplus/rxdb-hasura'
import React from 'react'
import { RxDocument } from 'rxdb'

type CommonCollectionComponentProps = {
  edit: boolean
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type CollectionComponent<T = {}> = React.FC<
  T &
    CommonCollectionComponentProps & {
      collection: ContentsCollection
      data: RxDocument<Contents>[]
    }
>

export type CollectionFromParamsComponent = React.FC<
  CommonCollectionComponentProps & {
    componentName: string
    collectionName: string
    ids: string[]
  }
>
