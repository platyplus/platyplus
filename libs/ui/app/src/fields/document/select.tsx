import { useCallback, useEffect, useState } from 'react'
import { SelectPicker } from 'rsuite'
import { useRxData } from 'rxdb-hooks'

import {
  Contents,
  ContentsDocument,
  relationshipTableId
} from '@platyplus/rxdb-hasura'

import { DocumentComponentWrapper } from '../../documents'
import { FieldComponent, FieldControl } from '../utils'
import {
  useContentsCollection,
  useOptions,
  useTableInfo
} from '@platyplus/react-rxdb-hasura'
import { filter, switchMap } from 'rxjs'

// TODO DRY from ../collection/wrapper
export const DocumentSelectField: FieldComponent = ({
  role,
  tableinfo,
  document,
  name,
  edit,
  editable,
  property
}) => {
  // TODO async - see https://rsuitejs.com/components/select-picker/#Async
  const refTable = useTableInfo(
    relationshipTableId(tableinfo, property.relationship)
  )
  const [data, setData] = useState<ContentsDocument>(null)
  const collection = useContentsCollection(refTable, role)
  useEffect(() => {
    // ? use rxdb-utils view? -> document[name].$.subscribe...
    if (collection && document && name in document) {
      const subscription = document
        .get$(name)
        .pipe(
          filter((id) => {
            if (id) return true
            else {
              setData(null)
              return false
            }
          }),
          switchMap((id) => collection.findOne(id).$)
        )
        .subscribe((refDocument) => {
          setData(refDocument)
        })
      return () => subscription.unsubscribe()
    }
  }, [document, name, tableinfo.id, role, collection])

  const queryConstructor = useCallback(
    (collection) => collection.find().sort('label'),
    []
  )
  const { result } = useRxData<Contents>(collection?.name, queryConstructor)

  const options = useOptions(refTable, result, role)

  return editable && edit ? (
    <FieldControl
      style={{ minWidth: 300 }}
      name={name}
      readOnly={!edit}
      data={options}
      cleanable={edit}
      accepter={SelectPicker}
    />
  ) : data ? (
    <DocumentComponentWrapper
      tableinfo={refTable}
      role={role}
      document={data}
      componentName="tag"
      edit={false}
    />
  ) : null
}
