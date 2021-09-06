import { CollectionComponent } from './types'
import React from 'react'
import { DocumentLabel } from '../documents'

export const LabelCollection: CollectionComponent = ({
  tableInfo,
  role,
  data,
  edit,
  config
}) => {
  return (
    <span>
      {data
        .sort((a, b) => (a.label < b.label ? -1 : 1))
        .map((doc, index) => (
          <React.Fragment key={doc.primary}>
            {!!index && ', '}
            <DocumentLabel
              tableInfo={tableInfo}
              role={role}
              config={config}
              document={doc}
              edit={edit}
            />
          </React.Fragment>
        ))}
    </span>
  )
}
