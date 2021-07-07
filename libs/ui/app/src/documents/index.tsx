import { Loading } from '@platyplus/navigation'
import { useDocument } from '@platyplus/react-rxdb-hasura'
import { useComponentsContext } from '../components'
import { DocumentComponentsConfig } from '../types'
import { DocumentDetails } from './details'

import { DocumentLabel } from './label'
import { DocumentComponent, DocumentFromParamsComponent } from './types'

export const defaultDocumentComponents: DocumentComponentsConfig = {
  default: DocumentDetails,
  label: DocumentLabel,
  details: DocumentDetails,
  card: () => <div>..card..</div>,
  chip: () => <div>..chip..</div>
}

export const useDocumentComponents = () => useComponentsContext().documents

export const DocumentComponentWrapper: DocumentComponent<{
  componentName?: string
}> = ({ document, edit = false, componentName = document.componentName() }) => {
  const documentComponents = useDocumentComponents()
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
