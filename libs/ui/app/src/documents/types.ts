/* eslint-disable @typescript-eslint/ban-types */
import React, { MutableRefObject } from 'react'
import { FormInstance } from 'rsuite/lib/Form'

import { ContentsDocument } from '@platyplus/rxdb-hasura'

type CommonDocumentComponentProps<T = {}> = T & {
  edit: boolean
  formRef?: MutableRefObject<FormInstance>
  config?: boolean
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
