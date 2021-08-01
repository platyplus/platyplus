import React from 'react'
import { Contents, Metadata } from '@platyplus/rxdb-hasura'

type CommonCollectionComponentProps = {
  edit: boolean
  config?: boolean
  metadata: Metadata
  role: string
  data: Contents[]
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
