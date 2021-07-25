import { ContentsDocument } from '@platyplus/rxdb-hasura'
import React from 'react'

export type FieldComponent<T = Record<string, unknown>> = React.FC<
  T & {
    editable?: boolean
    edit: boolean
    document: ContentsDocument
    field: string
    name?: string
  }
>
