import { ContentsDocument } from '@platyplus/rxdb-hasura'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export type DocumentComponent<T = {}> = React.FC<
  {
    document: ContentsDocument
    edit: boolean
  } & T
>
