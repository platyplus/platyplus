import { ContentsDocument, Metadata, Property } from '@platyplus/rxdb-hasura'
import React from 'react'

export type FieldComponent<T = Record<string, unknown>> = React.FC<
  T & {
    metadata: Metadata
    role: string
    property: Property
    name: string
    editable?: boolean
    edit: boolean
    document: ContentsDocument
    config?: boolean
  }
>
