import React from 'react'
import { ContentsDocument, Metadata } from '@platyplus/rxdb-hasura'

type CommonCollectionComponentProps = {
  edit: boolean
  config?: boolean
  metadata: Metadata
  role: string
  data: ContentsDocument[]
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type CollectionComponent<T = {}> = React.FC<
  T & CommonCollectionComponentProps
>

export type CollectionFromParamsComponent = React.FC<
  CommonCollectionComponentProps & {
    componentName: string
  }
>
