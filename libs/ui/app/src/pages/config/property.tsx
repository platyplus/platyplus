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
import {
  collectionPropertyType,
  ContentsCollection
} from '@platyplus/rxdb-hasura'
import { upperCaseFirst } from '@platyplus/data'

import { useComponentsContext } from '../../components'
import { useMemo } from 'react'
import { PropertyIcon } from '../../documents'

export const PropertyConfig: React.FC<{
  collection: ContentsCollection
  name: string
  expanded: boolean
  onSelect: () => void
}> = ({ collection, name, expanded, onSelect }) => {
  const metadata = collection.metadata
  const [config, setConfig] = usePropertyConfig(metadata, name, null)
  const componentContext = useComponentsContext()
  const type = useMemo(
    () => collectionPropertyType(collection, name),
    [collection, name]
  )

  const fieldComponents = useMemo(
    () => Object.keys(componentContext.fields[type]),
    [componentContext.fields, type]
  )
  const title = useMemo(
    () => (config?.title ? `${config.title} (${name})` : name),
    [config, name]
  )
  return (
    <Panel
      header={
        <span>
          <PropertyIcon collection={collection} property={name} />
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
