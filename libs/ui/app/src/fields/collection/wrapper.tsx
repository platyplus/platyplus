import { useCallback } from 'react'
import { useRxData } from 'rxdb-hooks'

import { Contents } from '@platyplus/rxdb-hasura'

import { CollectionComponentWrapper } from '../../collections'
import { FieldControl } from '../utils'
import { useCollectionName, useMetadata } from '@platyplus/react-rxdb-hasura'
import { CollectionFieldComponent } from './types'
import { useAsync } from 'react-use'

export const CollectionField: CollectionFieldComponent = ({
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
  const data = useAsync(
    async () => await document.populate(name),
    [document, name]
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
  ) : data.loading ? null : (
    <CollectionComponentWrapper
      metadata={refMetadata}
      role={role}
      data={data.value}
      componentName={component}
      edit={false}
    />
  )
}
