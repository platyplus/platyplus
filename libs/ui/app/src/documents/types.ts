/* eslint-disable @typescript-eslint/ban-types */
import React, { MutableRefObject } from 'react'
import { FormInstance } from 'rsuite/lib/Form'

import { Contents, Metadata } from '@platyplus/rxdb-hasura'

type CommonDocumentComponentProps<T = {}> = T & {
  metadata: Metadata
  role: string
  edit: boolean
  formRef?: MutableRefObject<FormInstance>
  config?: boolean
}

export type DocumentComponent<T = {}> = React.FC<
  CommonDocumentComponentProps<T> & {
    document: Contents
  }
>
