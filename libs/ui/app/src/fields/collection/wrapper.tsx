import { useCallback, useEffect, useState } from 'react'
import { useRxData } from 'rxdb-hooks'

import {
  Contents,
  ContentsDocument,
  shiftedMetadataTable
} from '@platyplus/rxdb-hasura'
import { useCollectionName } from '@platyplus/react-rxdb-hasura'

import { CollectionComponentWrapper } from '../../collections'
import { FieldControl } from '../utils'
import { CollectionFieldComponent } from './types'

export const CollectionField: CollectionFieldComponent = ({
  document,
  name,
  property,
  role,
  edit,
  editable,
  metadata,
  accepter: Accepter,
  component = 'label'
}) => {
  const refMetadata = shiftedMetadataTable(metadata, property.relationship)
  const refCollectionName = useCollectionName(refMetadata, role)
  const queryConstructor = useCallback(
    (collection) => collection.find().sort('label'),
    []
  )
  const [data, setData] = useState<ContentsDocument[]>([])
  useEffect(() => {
    if (!document.get(name)) return // ! react sync issue, weird
    // TODO pipe rxjs subscriptions
    const subscription = document.get$(name).subscribe((values) =>
      document.collection.database[refCollectionName]
        .findByIds(values)
        .then((mapDocs: Map<string, ContentsDocument>) => {
          setData([...mapDocs.values()])
        })
    )
    return () => subscription.unsubscribe()
  }, [
    document,
    name,
    refCollectionName,
    property,
    refMetadata,
    metadata.id,
    role
  ])
  const { isFetching, result } = useRxData<Contents>(
    refCollectionName,
    queryConstructor
  )
  const options = result.map((doc) => ({ label: doc.label, value: doc.id }))

  return edit ? (
    <FieldControl
      metadata={metadata}
      style={{ minWidth: 300 }}
      name={name}
      readOnly={!edit}
      data={isFetching ? [] : options}
      initial={data}
      cleanable={edit}
      accepter={Accepter}
    />
  ) : (
    <CollectionComponentWrapper
      metadata={refMetadata}
      role={role}
      data={data}
      componentName={component}
      edit={false}
    />
  )
}
