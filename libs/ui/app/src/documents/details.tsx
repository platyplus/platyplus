import { ControlLabel, Form, FormGroup, HelpBlock } from 'rsuite'

import { DocumentComponent } from './types'
import {
  PropertyTitle,
  useDocumentProperties,
  useGetForm,
  useSetForm
} from '@platyplus/react-rxdb-hasura'
import { FieldComponentWrapper } from '../fields'
import { ContentsCollection } from '@platyplus/rxdb-hasura'

export const DocumentDetails: DocumentComponent = ({ document, edit }) => {
  const setForm = useSetForm(document)
  const properties = useDocumentProperties(document)
  const formValues = useGetForm(document)
  if (properties)
    return (
      <Form
        // formValue={formValues}
        onChange={setForm}
        fluid
        formDefaultValue={formValues}
      >
        {[...properties.keys()].map((property) => (
          <FormGroup key={property}>
            <ControlLabel>
              <PropertyTitle
                collection={document.collection as ContentsCollection}
                property={property}
              />
            </ControlLabel>
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
