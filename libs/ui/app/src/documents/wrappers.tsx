import { Loading } from '@platyplus/navigation'
import {
  useDocumentComponentName,
  useDocument
} from '@platyplus/react-rxdb-hasura'
import { useComponentsContext } from '../components'
import { DocumentComponent, DocumentFromParamsComponent } from './types'

export const DocumentComponentWrapper: DocumentComponent<{
  componentName?: string
}> = ({ document, edit = false, componentName }) => {
  const documentComponentName = useDocumentComponentName(document)
  const name = componentName || documentComponentName
  const documentComponents = useComponentsContext().documents
  const Component = name && documentComponents[name]
  if (Component) return <Component document={document} edit={edit} />
  else return <div>TODO: {name}</div>
}

export const DocumentFromParamsComponentWrapper: DocumentFromParamsComponent =
  ({ collectionName, componentName, id, edit = false }) => {
    const { isFetching, document } = useDocument(collectionName, id)

    if (isFetching) return <Loading />
    else
      return (
        <DocumentComponentWrapper
          document={document}
          edit={edit}
          componentName={componentName}
        />
      )
  }
