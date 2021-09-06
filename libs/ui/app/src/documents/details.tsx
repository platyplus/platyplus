import { ControlLabel, Form, FormGroup } from 'rsuite'

import {
  PropertyTitle,
  useFormModel,
  useFormGet,
  useFormSet,
  useTableProperties,
  usePropertyPermissions
} from '@platyplus/react-rxdb-hasura'

import { FieldComponent, FieldComponentWrapper } from '../fields'
import { DocumentComponent } from './types'
import { PropertyIcon } from './icon'
import { useRef } from 'react'

const DocumentField: FieldComponent = ({
  property,
  name,
  tableInfo,
  role,
  document,
  edit,
  config
}) => {
  const required = property.required
  const { edit: editable } = usePropertyPermissions(
    tableInfo,
    role,
    name,
    document
  )
  if (document)
    return (
      <FormGroup>
        <ControlLabel>
          <PropertyIcon tableInfo={tableInfo} name={name} />
          <PropertyTitle tableInfo={tableInfo} name={name} editable={config} />
          {edit && required && '*'}
        </ControlLabel>
        <FieldComponentWrapper
          tableInfo={tableInfo}
          document={document}
          role={role}
          property={property}
          name={name}
          edit={edit}
          editable={editable}
        />
        {/* {edit && required && <HelpBlock>* Required</HelpBlock>} */}
      </FormGroup>
    )
  else return <div>no document</div>
}

export const DocumentDetails: DocumentComponent = ({
  tableInfo,
  role,
  document,
  edit,
  formRef,
  config
}) => {
  const [properties] = useTableProperties(tableInfo, { role })
  const form = useFormGet(tableInfo, role, document)
  const setForm = useFormSet(tableInfo, role, document)
  const model = useFormModel(tableInfo)
  const newRef = useRef()
  const ref = formRef || newRef
  // ? Why does useFormGet rerender the entire DocumentDetails component?
  if (properties)
    return (
      <Form onChange={setForm} model={model} formValue={form} fluid ref={ref}>
        {[...properties.entries()].map(([name, property]) => (
          <DocumentField
            key={name}
            tableInfo={tableInfo}
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
