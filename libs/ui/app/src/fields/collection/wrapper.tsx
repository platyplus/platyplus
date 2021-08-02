import React, { useCallback } from 'react'
import { TagPickerProps, CheckPickerProps, Animation } from 'rsuite'
import { useRxData } from 'rxdb-hooks'

import { Contents } from '@platyplus/rxdb-hasura'

import { CollectionComponentWrapper } from '../../collections'
import { FieldComponent, FieldControl } from '../utils'
import { useCollectionName, useMetadata } from '@platyplus/react-rxdb-hasura'

export const CollectionField: FieldComponent<
  | {
      accepter: React.ComponentType<CheckPickerProps | TagPickerProps>
      component: string
    }
  | CheckPickerProps
  | TagPickerProps
> = ({
  document,
  name,
  property,
  role,
  edit,
  editable,
  accepter: Accepter,
  component = 'label'
}) => {
  const refMetadata = useMetadata(property.relationship.ref)
  const refCollectionName = useCollectionName(refMetadata, role)
  const queryConstructor = useCallback(
    (collection) => collection.find().sort('label'),
    []
  )

  const { isFetching, result } = useRxData<Contents>(
    refCollectionName,
    queryConstructor
  )

  const options = result.map((doc) => ({ label: doc.label, value: doc.id }))
  return edit ? (
    <FieldControl
      style={{ minWidth: 300 }}
      name={name}
      readOnly={!edit}
      data={isFetching ? [] : options}
      cleanable={edit}
      accepter={Accepter}
    />
  ) : (
    <CollectionComponentWrapper
      metadata={refMetadata}
      role={role}
      data={document[name]}
      componentName={component}
      edit={false}
    />
  )
}
