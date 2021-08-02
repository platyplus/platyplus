import { useMemo } from 'react'

import { useComponentsLibrary } from '../components'
import { CollectionComponent } from './types'

export const CollectionComponentWrapper: CollectionComponent<{
  componentName?: string
}> = ({ edit = false, componentName, metadata, role, ...rest }) => {
  const collectionComponentName = metadata.config?.component || 'default'
  const name = useMemo(
    () => componentName || collectionComponentName,
    [componentName, collectionComponentName]
  )
  const library = useComponentsLibrary().collections
  const collectionComponents = useMemo(() => library, [library])
  const Component = useMemo(
    () => name && collectionComponents[name],
    [name, collectionComponents]
  )
  if (!metadata || !role) return null
  if (!Component) return <div>Collection component is missing: {name}</div>
  return <Component metadata={metadata} role={role} edit={edit} {...rest} />
}
