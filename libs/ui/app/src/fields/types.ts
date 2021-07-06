import { ContentsDocument } from '@platyplus/rxdb-hasura'
import React from 'react'

export type FieldComponent = React.FC<{
  editable?: boolean
  edit: boolean
  document: ContentsDocument
  field: string
  name?: string
}>
