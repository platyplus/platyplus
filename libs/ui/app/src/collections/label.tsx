import { CollectionComponent } from './types'
import React from 'react'
import { DocumentComponentWrapper } from '../documents'

export const LabelCollection: CollectionComponent = ({ data, edit }) => {
  return (
    <span>
      {data
        .sort((a, b) => (a.label < b.label ? -1 : 1))
        .map((doc, index) => (
          <React.Fragment key={doc.primary}>
            {!!index && ', '}
            <DocumentComponentWrapper
              document={doc}
              edit={edit}
              componentName="label"
            />
          </React.Fragment>
        ))}
    </span>
  )
}
