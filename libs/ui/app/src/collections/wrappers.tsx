import { useMemo } from 'react'

import { useComponentsLibrary } from '../components'
import { CollectionComponent } from './types'

export const CollectionComponentWrapper: CollectionComponent<{
  componentName?: string
}> = ({ edit = false, componentName, tableInfo, role, ...rest }) => {
  const collectionComponentName = tableInfo.config?.component || 'default'
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
  if (!tableInfo || !role) return null
  if (!Component) return <div>Collection component is missing: {name}</div>
  return <Component tableInfo={tableInfo} role={role} edit={edit} {...rest} />
}
