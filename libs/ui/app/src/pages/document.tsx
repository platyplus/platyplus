import { useRef } from 'react'
import { Animation } from 'rsuite'
import { useParams } from 'react-router'

import { DocumentPanel, HeaderTitleWrapper } from '@platyplus/layout'
import { useQuery } from '@platyplus/navigation'
import {
  DocumentLabel,
  DocumentTitle,
  useConfigEnabled,
  useDocumentTitle,
  useMetadata,
  usePopulatedDocument
} from '@platyplus/react-rxdb-hasura'

import { DocumentToolbar, DocumentComponentWrapper } from '../documents'

export const DocumentPage: React.FC = () => {
  const { name, role, id } =
    useParams<{ name: string; role: string; id: string }>()
  const editing = useQuery().has('edit') || id === 'new'
  const enabledConfig = useConfigEnabled()

  const metadata = useMetadata(name)
  const { document, isFetching } = usePopulatedDocument(metadata, role, id)
  const [title] = useDocumentTitle(metadata)
  const formRef = useRef()
  if (!metadata) return null
  return (
    <HeaderTitleWrapper
      title={title}
      component={
        <DocumentTitle
          editable={enabledConfig}
          metadata={metadata}
          document={document}
        />
      }
      previous
    >
      <Animation.Fade in={!isFetching && !!document}>
        {(props) => {
          return (
            <div {...props}>
              {document && (
                <DocumentPanel
                  title={
                    <DocumentLabel
                      metadata={metadata}
                      role={role}
                      editable={enabledConfig}
                      document={document}
                    />
                  }
                  toolbar={
                    <DocumentToolbar
                      metadata={metadata}
                      role={role}
                      document={document}
                      edit={editing}
                      formRef={formRef}
                    />
                  }
                >
                  <DocumentComponentWrapper
                    config={enabledConfig}
                    metadata={metadata}
                    role={role}
                    document={document}
                    edit={editing}
                    formRef={formRef}
                  />
                </DocumentPanel>
              )}
            </div>
          )
        }}
      </Animation.Fade>
    </HeaderTitleWrapper>
  )
}
