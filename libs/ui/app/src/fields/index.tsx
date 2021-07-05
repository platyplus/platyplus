import { useComponentsContext } from '../components'
import { FieldComponentsConfig } from '../types'
import { ToggleField } from './toggle'
import { DateField } from './date'
import { DateTimeField } from './date-time'
import { IntegerField } from './integer'
import { NumberField } from './number'
import { StringField } from './string'
import { FieldComponent } from './types'

export const defaultFieldComponents: FieldComponentsConfig = {
  integer: IntegerField,
  document: () => <div>..document..</div>,
  string: StringField,
  'date-time': DateTimeField,
  boolean: ToggleField,
  toggle: ToggleField,
  date: DateField,
  number: NumberField,
  collection: () => <div>..collection..</div>
}

export const useFieldComponents = () => useComponentsContext().fields

export const FieldComponentWrapper: FieldComponent = ({
  document,
  field,
  edit
}) => {
  const fieldComponents = useFieldComponents()
  const componentName = edit
    ? document.editComponent(field)
    : document.readComponent(field)
  const Component = componentName && fieldComponents[componentName]
  if (Component)
    return <Component document={document} field={field} edit={edit} />
  else return <div>TODO: {componentName}</div>
}
