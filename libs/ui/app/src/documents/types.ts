/* eslint-disable @typescript-eslint/ban-types */
import React, { MutableRefObject } from 'react'
import { FormInstance } from 'rsuite/lib/Form'

import { ContentsDocument, TableInformation } from '@platyplus/rxdb-hasura'

type CommonDocumentComponentProps<T = {}> = T & {
  tableInfo: TableInformation
  role: string
  edit: boolean
  formRef?: MutableRefObject<FormInstance>
  config?: boolean
}

export type DocumentComponent<T = {}> = React.FC<
  CommonDocumentComponentProps<T> & {
    document: ContentsDocument
  }
>
