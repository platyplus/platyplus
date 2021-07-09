import { useDocumentComponentName } from '@platyplus/react-rxdb-hasura'
import { useComponentsContext } from '../components'

import { FieldComponent } from './types'

export const FieldComponentWrapper: FieldComponent = ({
  document,
  field,
  edit,
  editable
}) => {
  const fieldComponents = useComponentsContext().fields
  const componentName = useDocumentComponentName(document, field)
  const propertyType = document.propertyType(field)

  const Component =
    componentName && fieldComponents[propertyType][componentName]
  if (Component)
    return (
      <Component
        document={document}
        field={field}
        edit={edit}
        editable={editable}
      />
    )
  else return <div>TODO: {componentName}</div>
}
