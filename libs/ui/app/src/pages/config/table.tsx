import React, { useCallback, useMemo, useState } from 'react'
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
  useMetadataStore,
  useMetadataConfig,
  useMetadataProperties
} from '@platyplus/react-rxdb-hasura'
import { HeaderTitleWrapper, IconPicker } from '@platyplus/layout'
import { upperCaseFirst } from '@platyplus/data'

import { useComponentsLibrary } from '../../components'
import { PropertyConfig } from './property'
import { Metadata, metadataName } from '@platyplus/rxdb-hasura'

const MetadataWrapper: React.FC<{ table: Metadata; title: string }> = ({
  table,
  title
}) => {
  const [properties, setProperties] = useMetadataProperties(table)
  const [config, setConfig] = useMetadataConfig<Record<string, unknown>>(
    table.id
  )

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
              metadata={table}
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
    <HeaderTitleWrapper title={title} previous>
      <Nav appearance="tabs" activeKey={tab} onSelect={setTab}>
        <Nav.Item eventKey="collection">Collection</Nav.Item>
        <Nav.Item eventKey="document">Document</Nav.Item>
        <Nav.Item eventKey="fields">Fields</Nav.Item>
      </Nav>
      <Panel>{tabs[tab]}</Panel>
    </HeaderTitleWrapper>
  )
}

export const ConfigTablePage: React.FC<{ role?: string }> = () => {
  const { id } = useParams<{ id: string }>()
  const table = useMetadataStore(useCallback((state) => state.tables[id], [id]))
  const metaName = useMemo(() => table && metadataName(table), [table])

  const [collectionTitle] = table.config?.title
  const title = useMemo(
    () =>
      metaName &&
      (collectionTitle !== metaName
        ? `${collectionTitle} (${metaName})`
        : metaName),
    [metaName, collectionTitle]
  )

  return (
    <Animation.Fade in={!!collectionTitle}>
      {(props) => (
        <div {...props}>
          {table && <MetadataWrapper table={table} title={title} />}
        </div>
      )}
    </Animation.Fade>
  )
}
