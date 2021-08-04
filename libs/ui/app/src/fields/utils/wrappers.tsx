import { useMemo } from 'react'
import { useComponentsLibrary } from '../../components'

import { FieldComponent } from './types'

export const FieldComponentWrapper: FieldComponent = ({
  property,
  ...rest
}) => {
  const library = useComponentsLibrary().fields
  const componentType = property.config?.component || 'default'
  const Component = useMemo(
    () => library[property.type]?.[componentType],
    [library, property, componentType]
  )

  if (Component) return <Component property={property} {...rest} />
  else
    return (
      <div>
        Unknown component {property.type}.{componentType}
      </div>
    )
}
