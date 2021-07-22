import { ControlLabel, Form, FormGroup, HelpBlock } from 'rsuite'
import { TopLevelProperty } from 'rxdb/dist/types/types'

import {
  PropertyTitle,
  useDocumentProperties,
  useGetForm,
  useSetForm
} from '@platyplus/react-rxdb-hasura'
import { ContentsDocument } from '@platyplus/rxdb-hasura'

import { FieldComponentWrapper } from '../fields'
import { DocumentComponent } from './types'
import { PropertyIcon } from './icon'

const DocumentField: React.FC<{
  document: ContentsDocument
  propertyName: string
  edit: boolean
  property: TopLevelProperty
}> = ({ document, propertyName, property, edit }) => (
  <FormGroup key={'dewdo' + propertyName}>
    <ControlLabel>
      <PropertyIcon
        collection={document.collection}
        property={propertyName}
        style={{ paddingRight: '10px' }}
      />
      <PropertyTitle collection={document.collection} property={propertyName} />
    </ControlLabel>
    <FieldComponentWrapper
      key={'oifure' + propertyName}
      document={document}
      field={propertyName}
      edit={edit}
      editable={true}
    />
    {edit && property.required && <HelpBlock>Required</HelpBlock>}
  </FormGroup>
)

export const DocumentDetails: DocumentComponent = ({ document, edit }) => {
  const setForm = useSetForm(document)
  const [properties] = useDocumentProperties(document)
  const formValues = useGetForm(document)
  if (properties)
    return (
      <Form onChange={setForm} fluid formValue={formValues}>
        {[...properties.keys()].map((property) => (
          <DocumentField
            key={'dew' + property}
            document={document}
            property={properties.get(property)}
            propertyName={property}
            edit={edit}
          />
        ))}
      </Form>
    )
  else return null
}
