import { ControlLabel, Form, FormGroup, HelpBlock } from 'rsuite'
import { TopLevelProperty } from 'rxdb/dist/types/types'

import {
  PropertyTitle,
  useDocumentProperties,
  useFormModel,
  useFormGet,
  useFormSet
} from '@platyplus/react-rxdb-hasura'
import { ContentsDocument } from '@platyplus/rxdb-hasura'

import { FieldComponentWrapper } from '../fields'
import { DocumentComponent } from './types'
import { PropertyIcon } from './icon'
import { useRef } from 'react'

const DocumentField: React.FC<{
  document: ContentsDocument
  propertyName: string
  edit: boolean
  property: TopLevelProperty
}> = ({ document, propertyName, property, edit }) => (
  <FormGroup>
    <ControlLabel>
      <PropertyIcon
        collection={document.collection}
        property={propertyName}
        style={{ paddingRight: '10px' }}
      />
      <PropertyTitle collection={document.collection} property={propertyName} />
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

export const DocumentDetails: DocumentComponent = ({
  document,
  edit,
  formRef
}) => {
  const [properties] = useDocumentProperties(document)
  const form = useFormGet(document)
  const setForm = useFormSet(document)
  const model = useFormModel(document)
  const newRef = useRef()
  const ref = formRef || newRef
  // ? Why does useFormGet rerender the entire DocumentDetails component?
  if (properties)
    return (
      <Form onChange={setForm} model={model} formValue={form} fluid ref={ref}>
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
