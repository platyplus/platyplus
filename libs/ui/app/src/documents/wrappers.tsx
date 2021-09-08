import { useDocumentComponentName } from '@platyplus/react-rxdb-hasura'
import { useComponentsLibrary } from '../components'
import { DocumentComponent } from './types'

export const DocumentComponentWrapper: DocumentComponent<{
  componentName?: string
}> = ({ document, tableInfo, edit = false, componentName, ...rest }) => {
  const [documentComponentName] = useDocumentComponentName(tableInfo.id)
  const name = componentName || documentComponentName
  const library = useComponentsLibrary().documents
  const Component = library[name]
  if (!Component) return <div>Document component is missing: {name}</div>
  return (
    <Component
      tableInfo={tableInfo}
      document={document}
      edit={edit}
      {...rest}
    />
  )
}
