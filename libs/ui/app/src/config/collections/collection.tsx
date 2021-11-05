import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Animation,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  InputPicker,
  List,
  Nav,
  Panel
} from 'rsuite'

import {
  useTableConfig,
  useTableProperties,
  useTableInfo
} from '@platyplus/react-rxdb-hasura'
import { HeaderTitleWrapper, IconPicker } from '@platyplus/layout'
import { upperCaseFirst } from '@platyplus/data'

import { useComponentsLibrary } from '../../components'
import { PropertyConfig } from './property'
import { TableInformation, tableName } from '@platyplus/rxdb-hasura'

const TableWrapper: React.FC<{
  table: TableInformation
  title: string
}> = ({ table, title }) => {
  const [properties, setProperties] = useTableProperties(table)
  const {
    state: config,
    setState: setConfig,
    isFetching
  } = useTableConfig<Record<string, unknown>>(table.id)

  const library = useComponentsLibrary()
  const collectionComponents = Object.keys(library.collections)
  const documentComponents = Object.keys(library.documents).filter(
    (name) => !['tag', 'label'].includes(name)
  )

  const sortProperties = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    const result = Array.from(properties)
    const [removed] = result.splice(oldIndex, 1)
    result.splice(newIndex, 0, removed)
    setProperties(new Map(result))
  }
  const [tab, setTab] = useState('collection')
  const [expandedProperties, setExpandedProperties] = useState<
    Record<string, boolean>
  >({})
  const toggleProperty = (name: string) =>
    setExpandedProperties({
      ...expandedProperties,
      [name]: !expandedProperties[name]
    })

  const tabs = {
    collection: (
      <Form key="formCollection" formDefaultValue={config} onChange={setConfig}>
        <FormGroup>
          <ControlLabel>Collection title</ControlLabel>
          <FormControl name="title" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <FormControl name="description" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Icon</ControlLabel>
          <FormControl name="icon" accepter={IconPicker} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Component</ControlLabel>
          <FormControl
            name="component"
            data={collectionComponents.map((value) => ({
              value,
              label: upperCaseFirst(value)
            }))}
            accepter={InputPicker}
          />
        </FormGroup>
      </Form>
    ),
    document: (
      <Form key="formDocument" formDefaultValue={config} onChange={setConfig}>
        <FormGroup>
          <ControlLabel>Document title</ControlLabel>
          <FormControl name="document_title" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Document label</ControlLabel>
          <FormControl name="document_label" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Component</ControlLabel>
          <FormControl
            name="document_component"
            data={documentComponents.map((value) => ({
              value,
              label: upperCaseFirst(value)
            }))}
            accepter={InputPicker}
          />
        </FormGroup>
      </Form>
    ),
    fields: properties ? (
      <List sortable onSort={sortProperties} pressDelay={300}>
        {[...properties.entries()].map(([name, property], index) => (
          <List.Item key={name} index={index}>
            <PropertyConfig
              tableinfo={table}
              name={name}
              property={property}
              expanded={expandedProperties[name]}
              onSelect={() => toggleProperty(name)}
            />
          </List.Item>
        ))}
      </List>
    ) : null
  }
  return (
    !isFetching && (
      <HeaderTitleWrapper title={title} previous>
        <Nav appearance="tabs" activeKey={tab} onSelect={setTab}>
          <Nav.Item eventKey="collection">Collection</Nav.Item>
          <Nav.Item eventKey="document">Document</Nav.Item>
          <Nav.Item eventKey="fields">Fields</Nav.Item>
        </Nav>
        <Panel>{tabs[tab]}</Panel>
      </HeaderTitleWrapper>
    )
  )
}

export const ConfigCollectionPage: React.FC<{ role?: string }> = () => {
  const { id } = useParams<{ id: string }>()
  const table = useTableInfo(id)
  const metaName = useMemo(() => table && tableName(table), [table])
  const { state: config } = useTableConfig(id)
  const title = useMemo(() => {
    const collectionTitle = config?.title
    return (
      metaName &&
      (collectionTitle && collectionTitle !== metaName
        ? `${collectionTitle} (${metaName})`
        : metaName)
    )
  }, [metaName, config])

  return (
    <Animation.Fade in={!!table}>
      {(props) => (
        <div {...props}>
          {table && (
            <TableWrapper table={table} title={`Collection: ${title}`} />
          )}
        </div>
      )}
    </Animation.Fade>
  )
}
