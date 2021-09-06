import { useCallback, useEffect, useMemo, useState } from 'react'
import { SelectPicker } from 'rsuite'
import { useRxData } from 'rxdb-hooks'

import {
  Contents,
  ContentsDocument,
  relationshipTableId
} from '@platyplus/rxdb-hasura'

import { DocumentComponentWrapper } from '../../documents'
import { FieldComponent, FieldControl } from '../utils'
import { useCollectionName, useTableInfo } from '@platyplus/react-rxdb-hasura'
import { switchMap } from 'rxjs'

// TODO DRY from ../collection/wrapper
export const DocumentSelectField: FieldComponent = ({
  role,
  tableInfo,
  document,
  name,
  edit,
  editable,
  property
}) => {
  // TODO async - see https://rsuitejs.com/components/select-picker/#Async
  const refTable = useTableInfo(
    relationshipTableId(tableInfo, property.relationship)
  )
  const refCollectionName = useCollectionName(refTable, role)

  const [data, setData] = useState<ContentsDocument>(null)
  useEffect(() => {
    // ? use rxdb-utils view? -> document[name].$.subscribe...
    const subscription = document
      .get$(name)
      .pipe(
        switchMap(
          (id) => document.collection.database[refCollectionName].findOne(id).$
        )
      )
      .subscribe((refDocument: ContentsDocument) => setData(refDocument))
    return () => subscription.unsubscribe()
  }, [
    document,
    name,
    refCollectionName,
    property,
    refTable,
    tableInfo.id,
    role
  ])

  const queryConstructor = useCallback(
    (collection) => collection.find().sort('label'),
    []
  )
  const { result, isFetching } = useRxData<Contents>(
    refCollectionName,
    queryConstructor
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
  ) : data ? (
    <DocumentComponentWrapper
      tableInfo={refTable}
      role={role}
      document={data}
      componentName="label"
      edit={false}
    />
  ) : null
}
