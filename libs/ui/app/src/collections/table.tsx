import { useHistory } from 'react-router-dom'
import { Table } from 'rsuite'

import { Contents, ContentsDocument } from '@platyplus/rxdb-hasura'

import { CollectionComponent } from './types'
import { FieldComponentWrapper } from '../fields'
import {
  PropertyTitle,
  useMetadataProperties
} from '@platyplus/react-rxdb-hasura'

const { Column, HeaderCell, Cell } = Table

export const TableCollection: CollectionComponent = ({
  metadata,
  role,
  data,
  config
}) => {
  const history = useHistory()
  const [properties] = useMetadataProperties(metadata)
  if (!metadata || !properties) return <span>no metadata/properties</span>
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
      {[...properties.entries()].map(([name, property]) => (
        <Column flexGrow={1} key={name}>
          <HeaderCell>
            <PropertyTitle editable={config} metadata={metadata} name={name} />
          </HeaderCell>
          <Cell>
            {(document: Contents) => {
              return (
                <FieldComponentWrapper
                  metadata={metadata}
                  role={role}
                  name={name}
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
