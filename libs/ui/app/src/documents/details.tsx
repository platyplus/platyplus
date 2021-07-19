import { ControlLabel, Form, FormGroup, HelpBlock } from 'rsuite'
import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'

import {
  PropertyTitle,
  useDocumentProperties,
  useGetForm,
  useSetForm
} from '@platyplus/react-rxdb-hasura'
import { ContentsCollection, ContentsDocument } from '@platyplus/rxdb-hasura'

import { FieldComponentWrapper } from '../fields'
import { DocumentComponent } from './types'
import { PropertyIcon } from './icon'

const DocumentField: React.FC<{
  document: ContentsDocument
  propertyName: string
  edit: boolean
  property: TopLevelProperty | PrimaryProperty
}> = ({ document, propertyName, property, edit }) => (
  <FormGroup>
    <ControlLabel>
      <PropertyIcon
        collection={document.collection}
        property={propertyName}
        style={{ paddingRight: '10px' }}
      />
      <PropertyTitle
        collection={document.collection as ContentsCollection}
        property={propertyName}
      />
    </ControlLabel>
    <FieldComponentWrapper
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
      <Form onChange={setForm} fluid formDefaultValue={formValues}>
        {[...properties.keys()].map((property) => (
          <DocumentField
            key={property}
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
