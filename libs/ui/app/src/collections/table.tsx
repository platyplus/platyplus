import { useHistory } from 'react-router-dom'
import { Table } from 'rsuite'

import { PropertyTitle, useTableProperties } from '@platyplus/react-rxdb-hasura'
import { canRead, ContentsDocument } from '@platyplus/rxdb-hasura'

import { CollectionComponent } from './types'
import { FieldComponentWrapper } from '../fields'

const { Column, HeaderCell, Cell } = Table

export const TableCollection: CollectionComponent = ({
  tableInfo,
  role,
  data,
  config
}) => {
  const history = useHistory()
  const [properties] = useTableProperties(tableInfo)

  return (
    <Table
      hover
      height={400}
      autoHeight
      data={data}
      onRowClick={(data: ContentsDocument) => {
        history.push(`/collection/${role}/${tableInfo.id}/${data.id}`)
      }}
    >
      {[...properties.entries()]
        .filter(([propertyName]) => canRead(tableInfo, role, propertyName))
        .map(([, property]) => (
          <Column flexGrow={1} key={property.name}>
            <HeaderCell>
              <PropertyTitle
                editable={config}
                tableInfo={tableInfo}
                name={property.name}
              />
            </HeaderCell>
            <Cell>
              {(document: ContentsDocument) => {
                return (
                  <FieldComponentWrapper
                    tableInfo={tableInfo}
                    role={role}
                    name={property.name}
                    property={property}
                    document={document}
                    edit={false}
                  />
                )
              }}
            </Cell>
          </Column>
        ))}
    </Table>
  )
}
