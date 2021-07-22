import React, { useMemo } from 'react'
import {
  FormControl,
  TagPickerProps,
  CheckPickerProps,
  Animation
} from 'rsuite'
import { useRxQuery } from 'rxdb-hooks'

import {
  useDocumentProperties,
  useDocuments
} from '@platyplus/react-rxdb-hasura'
import { Contents } from '@platyplus/rxdb-hasura'

import { CollectionFromParamsComponentWrapper } from '../../collections'
import { FieldComponent } from '../types'

export const CollectionField: FieldComponent<{
  accepter: React.ComponentType<CheckPickerProps | TagPickerProps>
  component: string
}> = ({
  document,
  field,
  edit,
  editable,
  accepter: Accepter,
  component = 'label'
}) => {
  // TODO async - see https://rsuitejs.com/components/check-picker/#Async
  const [properties] = useDocumentProperties(document)
  const refCollectionName = properties.get(field).ref
  const refCollection = document.collection.database[refCollectionName]
  const rxQuery = useMemo(
    () => refCollection?.find().sort('label'),
    [refCollection]
  )

  const { isFetching, result } = useRxQuery<Contents>(rxQuery)
  const options = result.map((doc) => ({ label: doc.label, value: doc.id }))
  const { isFetching: isFetchingDocs, result: data } = useDocuments(
    refCollectionName,
    document[field]
  )
  return (
    <Animation.Fade in={!isFetching && !isFetchingDocs}>
      {(props, ref) => (
        <div {...props}>
          {edit ? (
            <FormControl
              name={field}
              readOnly={!edit}
              data={options}
              cleanable={edit}
              accepter={Accepter}
            />
          ) : (
            <CollectionFromParamsComponentWrapper
              collectionName={refCollectionName}
              ids={document[field]}
              componentName={component}
              edit={false}
            />
          )}
        </div>
      )}
    </Animation.Fade>
  )
}
