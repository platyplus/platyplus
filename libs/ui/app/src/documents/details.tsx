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
  tableinfo,
  role,
  document,
  edit,
  config
}) => {
  const required = property.required
  const { edit: editable, read: readable } = usePropertyPermissions(
    tableinfo,
    role,
    name,
    document
  )
  if (document && readable)
    return (
      <FormGroup>
        <ControlLabel>
          <PropertyIcon tableinfo={tableinfo} name={name} />
          <PropertyTitle tableinfo={tableinfo} name={name} editable={config} />
          {edit && required && '*'}
        </ControlLabel>
        <FieldComponentWrapper
          tableinfo={tableinfo}
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
  else return null
}

export const DocumentDetails: DocumentComponent = ({
  tableinfo,
  role,
  document,
  edit,
  formRef,
  config
}) => {
  const [properties] = useTableProperties(tableinfo, { role })
  const form = useFormGet(tableinfo, role, document)
  const setForm = useFormSet(tableinfo, role, document)
  const model = useFormModel(tableinfo, role, form, document._isTemporary)
  const newRef = useRef()
  const ref = formRef || newRef
  // ? Why does useFormGet rerender the entire DocumentDetails component?
  if (properties)
    return (
      <Form onChange={setForm} model={model} formValue={form} fluid ref={ref}>
        {[...properties.entries()].map(([name, property]) => (
          <DocumentField
            key={name}
            tableinfo={tableinfo}
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
