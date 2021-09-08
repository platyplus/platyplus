import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  InputPicker,
  Panel
} from 'rsuite'

import { usePropertyConfig } from '@platyplus/react-rxdb-hasura'

import { IconPicker } from '@platyplus/layout'
import { TableInformation, Property } from '@platyplus/rxdb-hasura'
import { upperCaseFirst } from '@platyplus/data'

import { useComponentsLibrary } from '../../components'
import { useMemo } from 'react'
import { PropertyIcon } from '../../documents'

export const PropertyConfig: React.FC<{
  tableInfo: TableInformation
  name: string
  property: Property
  expanded: boolean
  onSelect: () => void
}> = ({ tableInfo, name, property, expanded, onSelect }) => {
  const [config, setConfig] = usePropertyConfig(tableInfo, name, null)
  const library = useComponentsLibrary().fields

  const fieldComponents = useMemo(
    () => Object.keys(library[property.type]),
    [library, property.type]
  )
  const title = useMemo(
    () => (config?.title ? `${config.title} (${name})` : name),
    [config, name]
  )
  return (
    <Panel
      header={
        <span>
          <PropertyIcon tableInfo={tableInfo} name={name} />
          {title}
        </span>
      }
      collapsible
      bordered
      expanded={expanded}
      onSelect={onSelect}
    >
      <Form formDefaultValue={config} onChange={setConfig}>
        <FormGroup>
          <ControlLabel>Title</ControlLabel>
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
            data={fieldComponents.map((value) => ({
              value,
              label: upperCaseFirst(value)
            }))}
            accepter={InputPicker}
          />
        </FormGroup>{' '}
      </Form>
    </Panel>
  )
}
