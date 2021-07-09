import { Loading } from '@platyplus/navigation'
import { useDocument } from '@platyplus/react-rxdb-hasura'
import { useComponentsContext } from '../components'
import { DocumentComponent, DocumentFromParamsComponent } from './types'

export const DocumentComponentWrapper: DocumentComponent<{
  componentName?: string
}> = ({ document, edit = false, componentName = document.component() }) => {
  const tx = useComponentsContext()
  console.log(tx)
  const documentComponents = useComponentsContext().documents
  const Component = componentName && documentComponents[componentName]
  if (Component) return <Component document={document} edit={edit} />
  else return <div>TODO: {componentName}</div>
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
