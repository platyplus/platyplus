import { useComponentsContext } from '../components'
import { FieldComponentsConfig } from '../types'

import { ToggleField } from './toggle'
import { DateField } from './date'
import { DateTimeField } from './date-time'
import { IntegerField } from './integer'
import { NumberField } from './number'
import { StringField } from './string'
import { FieldComponent } from './types'
import { TimeField } from './time'
import { DocumentSelectSingleField } from './document-select-single'
import { DocumentSelectMultipleField } from './document-select-multiple'

export const defaultFieldComponents: FieldComponentsConfig = {
  integer: IntegerField,
  document: DocumentSelectSingleField,
  string: StringField,
  'date-time': DateTimeField,
  boolean: ToggleField,
  checkbox: ToggleField,
  date: DateField,
  time: TimeField,
  number: NumberField,
  collection: DocumentSelectMultipleField
}

export const useFieldComponents = () => useComponentsContext().fields

export const FieldComponentWrapper: FieldComponent = ({
  document,
  field,
  edit,
  editable
}) => {
  const fieldComponents = useFieldComponents()
  const componentName = edit
    ? document.editComponent(field)
    : document.readComponent(field)
  const Component = componentName && fieldComponents[componentName]
  if (Component)
    return (
      <Component
        document={document}
        field={field}
        edit={edit}
        editable={editable}
        name="label"
      />
    )
  else return <div>TODO: {componentName}</div>
}
