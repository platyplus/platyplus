import { Loading } from '@platyplus/navigation'
import {
  useDocumentProperties,
  useDocuments
} from '@platyplus/react-rxdb-hasura'
import { Contents } from '@platyplus/rxdb-hasura'
import React, { useMemo } from 'react'
import { FormControl, TagPickerProps, CheckPickerProps } from 'rsuite'
import { useRxQuery } from 'rxdb-hooks'
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
  const properties = useDocumentProperties(document)
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

  if (isFetching) return <Loading />
  // TODO bug - when picking one checkbox
  if (edit) {
    return (
      <FormControl
        name={field}
        readOnly={!edit}
        accepter={(props) => (
          <Accepter data={options} cleanable={edit} {...props} />
        )}
      />
    )
  } else if (isFetchingDocs) return <Loading />
  else
    return (
      <CollectionFromParamsComponentWrapper
        collectionName={refCollectionName}
        ids={document[field]}
        componentName={component}
        edit={false}
      />
    )
}
