import { useTableConfig } from '@platyplus/react-rxdb-hasura'
import { useMemo } from 'react'

import { useComponentsLibrary } from '../components'
import { CollectionComponent } from './types'

export const CollectionComponentWrapper: CollectionComponent<{
  componentName?: string
}> = ({ edit = false, componentName, tableinfo, role, ...rest }) => {
  const [config] = useTableConfig(tableinfo.id)
  const collectionComponentName = config?.component || 'default'
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
  if (!tableinfo || !role) return null
  if (!Component) return <div>Collection component is missing: {name}</div>
  return <Component tableinfo={tableinfo} role={role} edit={edit} {...rest} />
}
