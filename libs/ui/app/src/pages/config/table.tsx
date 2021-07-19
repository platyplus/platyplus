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
  useCollectionProperties,
  useContentsCollection,
  useMetadataDocument,
  useTableConfig
} from '@platyplus/react-rxdb-hasura'
import { HeaderTitleWrapper, IconPicker } from '@platyplus/layout'
import { metadataName } from '@platyplus/rxdb-hasura'
import { upperCaseFirst } from '@platyplus/data'

import { useComponentsContext } from '../../components'
import { PropertyConfig } from './property'

export const ConfigTablePage: React.FC<{ role?: string }> = ({
  role = 'user'
}) => {
  const { id } = useParams<{ id: string }>()
  const { isFetching, document } = useMetadataDocument(role, id)
  const title = useMemo(() => document && metadataName(document), [document])
  const collection = useContentsCollection(`${role}_${title}`)
  const [properties, setProperties] = useCollectionProperties(collection)
  const [config, setConfig] = useTableConfig<Record<string, unknown>>(document)

  const componentContext = useComponentsContext()
  const collectionComponents = Object.keys(componentContext.collections)
  const documentComponents = Object.keys(componentContext.documents).filter(
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
            accepter={(props) => (
              <InputPicker
                data={collectionComponents.map((value) => ({
                  value,
                  label: upperCaseFirst(value)
                }))}
                {...props}
              />
            )}
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
            accepter={(props) => (
              <InputPicker
                data={documentComponents.map((value) => ({
                  value,
                  label: upperCaseFirst(value)
                }))}
                {...props}
              />
            )}
          />
        </FormGroup>
      </Form>
    ),
    fields: properties ? (
      <List sortable onSort={sortProperties} pressDelay={300}>
        {[...properties.keys()].map((name, index) => (
          <List.Item key={name} index={index}>
            <PropertyConfig
              metadata={document}
              name={name}
              expanded={expandedProperties[name]}
              onSelect={() => toggleProperty(name)}
            />
          </List.Item>
        ))}
      </List>
    ) : null
  }

  return (
    <HeaderTitleWrapper title={title}>
      <Animation.Fade in={!isFetching}>
        {(props) =>
          document ? (
            <div {...props}>
              <Nav appearance="tabs" activeKey={tab} onSelect={setTab}>
                <Nav.Item eventKey="collection">Collection</Nav.Item>
                <Nav.Item eventKey="document">Document</Nav.Item>
                <Nav.Item eventKey="fields">Fields</Nav.Item>
              </Nav>
              <Panel>{tabs[tab]}</Panel>
            </div>
          ) : null
        }
      </Animation.Fade>
    </HeaderTitleWrapper>
  )
}
