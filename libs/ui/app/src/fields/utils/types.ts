import {
  ContentsDocument,
  TableInformation,
  Property
} from '@platyplus/rxdb-hasura'
import React from 'react'

export type FieldComponent<T = Record<string, unknown>> = React.FC<
  T & {
    tableInfo: TableInformation
    role: string
    property: Property
    name: string
    editable?: boolean
    edit: boolean
    document: ContentsDocument
    config?: boolean
  }
>
