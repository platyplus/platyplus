import { Contents, ContentsCollection } from '@platyplus/rxdb-hasura'
import React from 'react'
import { RxDocument } from 'rxdb'

export type CollectionComponent = React.FC<{
  collection: ContentsCollection
  data: RxDocument<Contents>[]
  edit: boolean
}>
