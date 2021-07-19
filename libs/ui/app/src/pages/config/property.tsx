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
import { Metadata } from '@platyplus/rxdb-hasura'
import { upperCaseFirst } from '@platyplus/data'

import { useComponentsContext } from '../../components'
import { useMemo } from 'react'

export const PropertyConfig: React.FC<{
  metadata: Metadata
  name: string
  expanded: boolean
  onSelect: () => void
}> = ({ metadata, name, expanded, onSelect }) => {
  const [config, setConfig] = usePropertyConfig(metadata, name, null)
  const componentContext = useComponentsContext()
  const fieldComponents = Object.keys(componentContext.fields)
  const title = useMemo(
    () => (config?.title ? `${config.title} (${name})` : name),
    [config, name]
  )
  return (
    <Panel
      header={title}
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
            accepter={(props) => (
              <InputPicker
                data={fieldComponents.map((value) => ({
                  value,
                  label: upperCaseFirst(value)
                }))}
                {...props}
              />
            )}
          />
        </FormGroup>{' '}
      </Form>
    </Panel>
  )
}
