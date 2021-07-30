import { useRef } from 'react'
import { Animation } from 'rsuite'
import { useParams } from 'react-router'

import { DocumentPanel, HeaderTitleWrapper } from '@platyplus/layout'
import { useQuery } from '@platyplus/navigation'
import {
  DocumentLabel,
  DocumentTitle,
  useConfigEnabled,
  useDocument,
  useDocumentTitle
} from '@platyplus/react-rxdb-hasura'

import { DocumentToolbar, DocumentComponentWrapper } from '../documents'

export const DocumentPage: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>()
  const editing = useQuery().has('edit') || id === 'new'
  const enabledConfig = useConfigEnabled()
  const { document, isFetching } = useDocument(name, id)
  const [title] = useDocumentTitle(document)
  const formRef = useRef()
  return (
    <HeaderTitleWrapper
      title={title}
      component={<DocumentTitle editable={enabledConfig} document={document} />}
      previous
    >
      <Animation.Fade in={!isFetching && !!document && !!title}>
        {(props) => {
          return (
            <div {...props}>
              <DocumentPanel
                title={
                  <DocumentLabel editable={enabledConfig} document={document} />
                }
                toolbar={
                  <DocumentToolbar
                    document={document}
                    edit={editing}
                    formRef={formRef}
                  />
                }
              >
                <DocumentComponentWrapper
                  config={enabledConfig}
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
