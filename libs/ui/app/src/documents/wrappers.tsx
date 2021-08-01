import { useDocumentComponentName } from '@platyplus/react-rxdb-hasura'
import { useComponentsLibrary } from '../components'
import { DocumentComponent } from './types'

export const DocumentComponentWrapper: DocumentComponent<{
  componentName?: string
}> = ({ document, metadata, edit = false, componentName, ...rest }) => {
  // TODO why this component is being rerendered so many times?
  const [documentComponentName] = useDocumentComponentName(metadata.id)
  const name = componentName || documentComponentName
  const library = useComponentsLibrary().documents
  const Component = library[name]
  if (!Component) return <div>Document component is missing: {name}</div>
  return (
    <Component metadata={metadata} document={document} edit={edit} {...rest} />
  )
}
