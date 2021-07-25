import { useRef } from 'react'
import { Animation } from 'rsuite'
import { useParams } from 'react-router'

import { DocumentPanel, HeaderTitleWrapper } from '@platyplus/layout'
import { useQuery } from '@platyplus/navigation'
import {
  DocumentLabel,
  DocumentTitle,
  useDocument,
  useDocumentTitle
} from '@platyplus/react-rxdb-hasura'

import { DocumentToolbar, DocumentComponentWrapper } from '../documents'

export const DocumentPage: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>()
  const editing = useQuery().has('edit') || id === 'new'
  const { document, isFetching } = useDocument(name, id)
  const [title] = useDocumentTitle(document)
  const formRef = useRef()
  return (
    <HeaderTitleWrapper
      title={title}
      component={<DocumentTitle document={document} />}
      previous
    >
      <Animation.Fade in={!isFetching}>
        {(props) => {
          return (
            <div {...props}>
              <DocumentPanel
                title={<DocumentLabel document={document} />}
                toolbar={
                  <DocumentToolbar
                    document={document}
                    edit={editing}
                    formRef={formRef}
                  />
                }
              >
                <DocumentComponentWrapper
                  document={document}
                  edit={editing}
                  formRef={formRef}
                />
              </DocumentPanel>
            </div>
          )
        }}
      </Animation.Fade>
    </HeaderTitleWrapper>
  )
}
