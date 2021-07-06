import { useComponentsContext } from '../components'
import { DocumentComponentsConfig } from '../types'
import { DocumentDetails } from './details'

import { DocumentLabel } from './label'
import { DocumentComponent } from './types'

export const defaultDocumentComponents: DocumentComponentsConfig = {
  default: DocumentDetails,
  label: DocumentLabel,
  details: DocumentDetails,
  card: () => <div>..card..</div>,
  chip: () => <div>..chip..</div>
}

export const useDocumentComponents = () => useComponentsContext().documents

export const DocumentComponentWrapper: DocumentComponent<{ name?: string }> = ({
  document,
  edit = false,
  name
}) => {
  const documentComponents = useDocumentComponents()
  const componentName = name || document.componentName()
  const Component = componentName && documentComponents[componentName]
  if (Component) return <Component document={document} edit={edit} />
  else return <div>TODO: {componentName}</div>
}
