import { ContentsDocument } from '@platyplus/rxdb-hasura'
import React from 'react'

export type FieldComponent = React.FC<{
  edit: boolean
  document: ContentsDocument
  field: string
}>
