import { useAsync } from 'react-use'
import { useHistory } from 'react-router-dom'
import { Table } from 'rsuite'

import {
  PropertyTitle,
  useMetadataProperties
} from '@platyplus/react-rxdb-hasura'
import { Loading } from '@platyplus/navigation'
import { Contents, ContentsDocument } from '@platyplus/rxdb-hasura'

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
  const populatedData = useAsync(async () => {
    const relationshipFields = [...metadata.properties.values()]
      .filter((property) => !!property.relationship)
      .map((property) => property.name)
    const res = await Promise.all(
      data.map(async (doc, k) => {
        const populatedDoc = { ...doc.toJSON() }
        for (const field of relationshipFields) {
          populatedDoc[field] = await doc.populate(field)
        }
        return populatedDoc
      })
    )
    return res
  }, [data, metadata])

  if (populatedData.loading) return <Loading backdrop />
  return (
    <Table
      hover
      height={400}
      autoHeight
      data={populatedData.value}
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
            {(document: Contents) => {
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
