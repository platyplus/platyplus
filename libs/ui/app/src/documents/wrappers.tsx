import { useDocumentComponentName } from '@platyplus/react-rxdb-hasura'
import { useComponentsLibrary } from '../components'
import { DocumentComponent } from './types'

export const DocumentComponentWrapper: DocumentComponent<{
  componentName?: string
}> = ({ document, tableinfo, edit = false, componentName, ...rest }) => {
  const { state } = useDocumentComponentName(tableinfo.id)
  const name = componentName || state
  const library = useComponentsLibrary().documents
  const Component = library[name]
  if (!Component) return <div>Document component is missing: {name}</div>
  return (
    <Component
      tableinfo={tableinfo}
      document={document}
      edit={edit}
      {...rest}
    />
  )
}
