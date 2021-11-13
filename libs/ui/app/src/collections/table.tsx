import { useNavigate } from 'react-router-dom'
import { Table } from 'rsuite'

import { PropertyTitle, useTableProperties } from '@platyplus/react-rxdb-hasura'
import { canRead, ContentsDocument } from '@platyplus/rxdb-hasura'

import { FieldComponentWrapper } from '../fields'

import { CollectionComponent } from './types'

const { Column, HeaderCell, Cell } = Table

export const TableCollection: CollectionComponent = ({
  tableinfo,
  role,
  data,
  config
}) => {
  const navigate = useNavigate()
  const [properties] = useTableProperties(tableinfo)

  return (
    <Table hover height={400} autoHeight data={data}>
      {[...properties.entries()]
        .filter(([propertyName]) => canRead(tableinfo, role, propertyName))
        .map(([, property]) => (
          <Column flexGrow={1} key={property.name}>
            <HeaderCell>
              <PropertyTitle
                editable={config}
                tableinfo={tableinfo}
                name={property.name}
              />
            </HeaderCell>
            <Cell>
              {(document: ContentsDocument) => {
                return (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '100%',
                      cursor: property.relationship ? null : 'pointer'
                    }}
                    onClick={() =>
                      !property.relationship &&
                      navigate(
                        `/collections/${role}/${tableinfo.id}/${document.id}`
                      )
                    }
                  >
                    <div className="rs-table-cell-content">
                      <FieldComponentWrapper
                        tableinfo={tableinfo}
                        role={role}
                        name={property.name}
                        property={property}
                        document={document}
                        edit={false}
                      />
                    </div>
                  </div>
                )
              }}
            </Cell>
          </Column>
        ))}
    </Table>
  )
}
