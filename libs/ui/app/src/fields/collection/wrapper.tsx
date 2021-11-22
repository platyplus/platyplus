import { filter, switchMap } from 'rxjs'
import { useEffect, useState } from 'react'

import { ContentsDocument, shiftedTable } from '@platyplus/rxdb-hasura'
import { useContentsCollection, useOptions } from '@platyplus/react-rxdb-hasura'

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
  tableinfo,
  accepter: Accepter,
  component = 'label'
}) => {
  const refTable = shiftedTable(tableinfo, property.relationship)
  const refCollection = useContentsCollection(refTable, role)

  const [data, setData] = useState<ContentsDocument[]>([])
  useEffect(() => {
    // ? use rxdb-utils view? -> document[name].$.subscribe...
    if (refCollection && name in document) {
      const subscription = document
        .get$(name)
        .pipe(
          filter((values) => values),
          switchMap((values) => refCollection.findByIds$(values))
        )
        .subscribe((mapDocs: Map<string, ContentsDocument>) => {
          setData([...mapDocs.values()])
        })
      return () => subscription.unsubscribe()
    }
  }, [document, name, refCollection, property])

  const options = useOptions(refTable, role)

  return editable && edit ? (
    <FieldControl
      tableinfo={tableinfo}
      role={role}
      style={{ minWidth: 300 }}
      name={name}
      readOnly={!edit}
      data={options}
      initial={data}
      cleanable={edit}
      accepter={Accepter}
    />
  ) : (
    <CollectionComponentWrapper
      tableinfo={refTable}
      role={role}
      data={data}
      componentName={component}
      edit={false}
    />
  )
}
