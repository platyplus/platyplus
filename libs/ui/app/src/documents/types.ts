/* eslint-disable @typescript-eslint/ban-types */
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import React from 'react'
type CommonDocumentComponentProps<T = {}> = T & {
  edit: boolean
}

export type DocumentComponent<T = {}> = React.FC<
  CommonDocumentComponentProps<T> & {
    document: ContentsDocument
  }
>

export type DocumentFromParamsComponent<T = {}> = React.FC<
  CommonDocumentComponentProps<T> & {
    componentName?: string
    collectionName: string
    id: string
  }
>
