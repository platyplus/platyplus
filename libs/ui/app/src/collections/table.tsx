import { useHistory } from 'react-router-dom'
import { Table } from 'rsuite'

import { ContentsDocument } from '@platyplus/rxdb-hasura'

import { CollectionComponent } from './types'
import { FieldComponentWrapper } from '../fields'
import { useCollectionProperties } from '@platyplus/react-rxdb-hasura'

const { Column, HeaderCell, Cell, Pagination } = Table

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
      {[...properties].map(([key, value]) => (
        <Column flexGrow={1} key={key}>
          <HeaderCell>{collection.title(key)}</HeaderCell>
          <Cell>
            {(document: ContentsDocument) => {
              if (document.collection.name === collection.name)
                return (
                  <FieldComponentWrapper
                    document={document}
                    edit={false}
                    field={key}
                  />
                )
            }}
          </Cell>
        </Column>
      ))}
    </Table>
  )
}
