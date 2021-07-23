import { usePropertyComponentName } from '@platyplus/react-rxdb-hasura'
import { propertyType } from '@platyplus/rxdb-hasura'
import { useComponentsContext } from '../components'

import { FieldComponent } from './types'

export const FieldComponentWrapper: FieldComponent = ({
  document,
  field,
  edit,
  editable
}) => {
  const fieldComponents = useComponentsContext().fields
  const [componentName] = usePropertyComponentName(document, field)
  const type = propertyType(document, field) // TODO reactive

  const Component = componentName && fieldComponents[type][componentName]
  if (Component)
    return (
      <Component
        document={document}
        field={field}
        edit={edit}
        editable={editable}
      />
    )
  else return <div>Unknown component {componentName}</div>
}
