import { Animation } from 'rsuite'
import { useParams } from 'react-router'

import {
  DocumentPanel,
  HeaderTitleWrapper,
  useWindowTitle
} from '@platyplus/layout'
import { useQuery } from '@platyplus/navigation'
import {
  DocumentTitle,
  useDocument,
  useDocumentLabel,
  useDocumentTitle
} from '@platyplus/react-rxdb-hasura'

import { DocumentToolbar } from '../common'
import { DocumentComponentWrapper } from '../documents'

export const DocumentPage: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>()
  const editing = useQuery().has('edit')
  const { document, isFetching } = useDocument(name, id)
  const label = useDocumentLabel(document)
  const [title] = useDocumentTitle(document)
  useWindowTitle(title)
  return (
    <HeaderTitleWrapper title={() => <DocumentTitle document={document} />}>
      <Animation.Fade in={!isFetching}>
        {(props, ref) => (
          <div {...props}>
            <DocumentPanel
              title={label}
              toolbar={<DocumentToolbar document={document} edit={editing} />}
            >
              <DocumentComponentWrapper document={document} edit={editing} />
            </DocumentPanel>
          </div>
        )}
      </Animation.Fade>
    </HeaderTitleWrapper>
  )
}
