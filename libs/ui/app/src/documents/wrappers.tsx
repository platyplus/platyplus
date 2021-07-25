import { Animation } from 'rsuite'
import {
  useDocumentComponentName,
  useDocument
} from '@platyplus/react-rxdb-hasura'
import { useComponentsContext } from '../components'
import { DocumentComponent, DocumentFromParamsComponent } from './types'

export const DocumentComponentWrapper: DocumentComponent<{
  componentName?: string
}> = ({ document, edit = false, componentName, ...rest }) => {
  // TODO why this component is being rerendered so many times?
  const [documentComponentName] = useDocumentComponentName(document)
  const name = componentName || documentComponentName
  const documentComponents = useComponentsContext().documents
  const Component = name && documentComponents[name]
  if (Component) return <Component document={document} edit={edit} {...rest} />
  else return <div>TODO: {name}</div>
}

export const DocumentFromParamsComponentWrapper: DocumentFromParamsComponent =
  ({ collectionName, id, edit = false, ...rest }) => {
    const { isFetching, document } = useDocument(collectionName, id)
    if (id)
      return (
        <Animation.Fade in={!isFetching}>
          {(props) => (
            <div {...props}>
              <DocumentComponentWrapper
                document={document}
                edit={edit}
                {...rest}
              />
            </div>
          )}
        </Animation.Fade>
      )
    else return null
  }
