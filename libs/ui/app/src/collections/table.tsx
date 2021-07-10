import { useHistory } from 'react-router-dom'
import { Table } from 'rsuite'

import { ContentsDocument } from '@platyplus/rxdb-hasura'

import { CollectionComponent } from './types'
import { FieldComponentWrapper } from '../fields'
import {
  PropertyTitle,
  useCollectionProperties
} from '@platyplus/react-rxdb-hasura'

const { Column, HeaderCell, Cell } = Table

export const TableCollection: CollectionComponent = ({ collection, data }) => {
  const history = useHistory()
  const properties = useCollectionProperties(collection)
  if (!collection) return null
  return (
    <Table
      height={400}
      autoHeight
      data={data}
      onRowClick={(data: ContentsDocument) => {
        history.push(`/collection/${collection.name}/${data.id}`)
      }}
    >
      {[...properties].map(([property, value]) => (
        <Column flexGrow={1} key={property}>
          <HeaderCell>
            <PropertyTitle collection={collection} property={property} />
          </HeaderCell>
          <Cell>
            {(document: ContentsDocument) => {
              if (document.collection.name === collection.name)
                return (
                  <FieldComponentWrapper
                    document={document}
                    edit={false}
                    field={property}
                  />
                )
            }}
          </Cell>
        </Column>
      ))}
    </Table>
  )
}
