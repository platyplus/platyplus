import { useCallback, useMemo } from 'react'
import { SelectPicker } from 'rsuite'
import { useRxData } from 'rxdb-hooks'

import { Contents } from '@platyplus/rxdb-hasura'

import { DocumentComponentWrapper } from '../../documents'
import { FieldComponent, FieldControl } from '../utils'
import { useCollectionName, useMetadata } from '@platyplus/react-rxdb-hasura'
import { useAsync } from 'react-use'

// TODO DRY from ../collection/wrapper
export const DocumentSelectField: FieldComponent = ({
  role,
  document,
  name,
  edit,
  editable,
  property
}) => {
  // TODO async - see https://rsuitejs.com/components/select-picker/#Async
  const refMetadata = useMetadata(property.relationship.ref)
  const refCollectionName = useCollectionName(refMetadata, role)

  const queryConstructor = useCallback(
    (collection) => collection.find().sort('label'),
    []
  )
  const { result, isFetching } = useRxData<Contents>(
    refCollectionName,
    queryConstructor
  )

  const data = useAsync(
    async () => await document.populate(name),
    [document, name]
  )

  const options = useMemo(
    () => result.map((doc) => ({ label: doc.label, value: doc.id })),
    [result]
  )

  return edit ? (
    <FieldControl
      style={{ minWidth: 300 }}
      name={name}
      readOnly={!edit}
      data={isFetching ? [] : options}
      cleanable={edit}
      accepter={SelectPicker}
    />
  ) : data.loading ? null : (
    <DocumentComponentWrapper
      metadata={refMetadata}
      role={role}
      document={data.value}
      componentName="label"
      edit={false}
    />
  )
}
