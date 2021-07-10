import { ControlLabel, Form, FormGroup, HelpBlock } from 'rsuite'

import { DocumentComponent } from './types'
import {
  useDocumentProperties,
  useDocumentPropertyConfig,
  useGetForm,
  useSetForm
} from '@platyplus/react-rxdb-hasura'
import { FieldComponentWrapper } from '../fields'
import { ContentsDocument } from '@platyplus/rxdb-hasura'

const Label: React.FC<{ document: ContentsDocument; property: string }> = ({
  document,
  property
}) => {
  const config = useDocumentPropertyConfig(document, property)
  return <ControlLabel>{config?.title || property}</ControlLabel>
}

export const DocumentDetails: DocumentComponent = ({ document, edit }) => {
  const setForm = useSetForm(document)
  const properties = useDocumentProperties(document)
  const formValues = useGetForm(document)
  if (properties)
    return (
      <Form
        formValue={formValues}
        onChange={(formValue) => {
          setForm(formValue)
        }}
        fluid
      >
        {[...properties.keys()].map((property) => (
          <FormGroup key={property}>
            <Label document={document} property={property} />
            <FieldComponentWrapper
              document={document}
              field={property}
              edit={edit}
              editable={true}
            />
            {edit && properties.get(property).required && (
              <HelpBlock>Required</HelpBlock>
            )}
          </FormGroup>
        ))}
      </Form>
    )
  else return null
}
