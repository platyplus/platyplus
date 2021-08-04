import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRxCollection, useRxData } from 'rxdb-hooks'

import {
  Contents,
  ContentsDocument,
  getIds,
  decomposeId
} from '@platyplus/rxdb-hasura'
import { useCollectionName, useMetadata } from '@platyplus/react-rxdb-hasura'

import { CollectionComponentWrapper } from '../../../collections'
import { FieldControl } from '../../utils'
import { CollectionFieldComponent } from '../types'

export const ManyToManyCollectionField: CollectionFieldComponent = ({
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
  const joinMetadata = useMetadata(property.relationship.remoteTableId)
  const queryConstructor = useCallback(
    (collection) => collection.find().sort('label'),
    []
  )

  const forwardRelationship = useMemo(
    () =>
      joinMetadata.relationships.find(
        // * find the relationship that is NOT pointing at the original table
        (relationship) => relationship.remoteTableId !== metadata.id
      ),
    [joinMetadata.relationships, metadata.id]
  )

  const targetMetadata = useMetadata(forwardRelationship.remoteTableId)
  const targetCollectionName = useCollectionName(targetMetadata, role)
  const targetCollection = useRxCollection<Contents>(targetCollectionName)

  const { isFetching, result } = useRxData<Contents>(
    targetCollectionName,
    queryConstructor
  )

  const options = result.map((item) => {
    const ids = getIds(joinMetadata)
    const composedId = ids
      .map((id) => {
        // TODO won't work if more than two relationships are present on the join table
        return joinMetadata.relationships.reduce((acc, rel) => {
          const mapping = rel.mapping.find((m) => m.column.name === id)
          if (mapping) {
            if (rel.remoteTableId === metadata.id) {
              // * backward relationship
              acc = document[mapping.remoteColumnName]
            } else {
              // * forward relationship
              acc = item[mapping.remoteColumnName]
            }
          }
          return acc
        }, '')
      })
      .join('|')
    return { label: item.label, value: composedId }
  })

  const [data, setData] = useState<ContentsDocument[]>([])
  const transitionKeys = useMemo(
    () =>
      forwardRelationship.mapping.reduce((acc, mapping) => {
        if (!acc.includes(mapping.column.name)) acc.push(mapping.column.name)
        return acc
      }, []),
    [forwardRelationship.mapping]
  )
  useEffect(() => {
    // if (!document.get(name)) return // ! react sync issue, weird
    // TODO pipe rxjs subscriptions
    const subscription = document.get$(name).subscribe((values: string[]) => {
      const targetIds = values
        .map((id) => decomposeId(joinMetadata, id))
        .map((v) => transitionKeys.map((key) => v[key]).join('|'))
      targetCollection
        ?.findByIds(targetIds)
        .then((result: Map<string, ContentsDocument>) =>
          setData([...result.values()])
        )
    })
    return () => subscription.unsubscribe()
  }, [
    document,
    name,
    metadata.id,
    role,
    joinMetadata,
    forwardRelationship.mapping,
    targetCollectionName,
    transitionKeys,
    targetCollection
  ])

  return edit ? (
    <FieldControl
      metadata={metadata}
      style={{ minWidth: 300 }}
      name={name}
      readOnly={!edit}
      data={isFetching ? [] : options}
      // TODO initial data...
      // initial={data}
      initial={[]}
      cleanable={edit}
      accepter={Accepter}
    />
  ) : (
    <CollectionComponentWrapper
      metadata={targetMetadata}
      role={role}
      data={data}
      componentName={component}
      edit={false}
    />
  )
}
