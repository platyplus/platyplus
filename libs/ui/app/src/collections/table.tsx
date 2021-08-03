import { useHistory } from 'react-router-dom'
import { Table } from 'rsuite'

import {
  PropertyTitle,
  useMetadataProperties
} from '@platyplus/react-rxdb-hasura'
import { ContentsDocument } from '@platyplus/rxdb-hasura'

import { CollectionComponent } from './types'
import { FieldComponentWrapper } from '../fields'

const { Column, HeaderCell, Cell } = Table

export const TableCollection: CollectionComponent = ({
  metadata,
  role,
  data,
  config
}) => {
  const history = useHistory()
  const [properties] = useMetadataProperties(metadata)

  return (
    <Table
      hover
      height={400}
      autoHeight
      data={data}
      onRowClick={(data: ContentsDocument) => {
        history.push(`/collection/${role}/${metadata.id}/${data.id}`)
      }}
    >
      {[...properties.values()].map((property) => (
        <Column flexGrow={1} key={property.name}>
          <HeaderCell>
            <PropertyTitle
              editable={config}
              metadata={metadata}
              name={property.name}
            />
          </HeaderCell>
          <Cell>
            {(document: ContentsDocument) => {
              return (
                <FieldComponentWrapper
                  metadata={metadata}
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
