import {
  usePropertyComponentName,
  usePropertyType
} from '@platyplus/react-rxdb-hasura'
import { useMemo } from 'react'
import { useComponentsContext } from '../../components'

import { FieldComponent } from './types'

export const FieldComponentWrapper: FieldComponent = ({
  document,
  field,
  edit,
  editable
}) => {
  const context = useComponentsContext()
  const [componentName] = usePropertyComponentName(document, field)
  const type = usePropertyType(document, field)

  const Component = useMemo(
    () => componentName && context.fields[type][componentName],
    [componentName, context, type]
  )
  if (Component)
    return (
      <div>
        <Component
          document={document}
          field={field}
          edit={edit}
          editable={editable}
        />
      </div>
    )
  else return <div>Unknown component {componentName}</div>
}
