import { ControlLabel, Form, FormGroup } from 'rsuite'

import {
  PropertyTitle,
  useFormModel,
  useFormGet,
  useFormSet,
  useMetadataProperties
} from '@platyplus/react-rxdb-hasura'

import { FieldComponent, FieldComponentWrapper } from '../fields'
import { DocumentComponent } from './types'
import { PropertyIcon } from './icon'
import { useRef } from 'react'

const DocumentField: FieldComponent = ({
  property,
  name,
  metadata,
  role,
  document,
  edit,
  config
}) => {
  const required = property.required
  if (document)
    return (
      <FormGroup>
        <ControlLabel>
          <PropertyIcon metadata={metadata} name={name} />
          <PropertyTitle metadata={metadata} name={name} editable={config} />
          {edit && required && '*'}
        </ControlLabel>
        <FieldComponentWrapper
          metadata={metadata}
          document={document}
          role={role}
          property={property}
          name={name}
          edit={edit}
          // TODO editable according to permissions
          editable={true}
        />
        {/* {edit && required && <HelpBlock>* Required</HelpBlock>} */}
      </FormGroup>
    )
  else return <div>no document</div>
}

export const DocumentDetails: DocumentComponent = ({
  metadata,
  role,
  document,
  edit,
  formRef,
  config
}) => {
  const [properties] = useMetadataProperties(metadata, { role })
  const form = useFormGet(metadata, role, document)
  const setForm = useFormSet(metadata, role, document)
  const model = useFormModel(metadata)
  const newRef = useRef()
  const ref = formRef || newRef
  // ? Why does useFormGet rerender the entire DocumentDetails component?
  if (properties)
    return (
      <Form onChange={setForm} model={model} formValue={form} fluid ref={ref}>
        {[...properties.entries()].map(([name, property]) => (
          <DocumentField
            key={name}
            metadata={metadata}
            document={document}
            role={role}
            property={property}
            name={name}
            edit={edit}
            config={config}
          />
        ))}
      </Form>
    )
  else return <div>no details</div>
}
