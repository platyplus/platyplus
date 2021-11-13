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
  useTableInfo,
  useDocument
} from '@platyplus/react-rxdb-hasura'

import { DocumentToolbar, DocumentComponentWrapper } from '../documents'
import { PrivateRoute } from '@platyplus/auth'

const Page: React.FC = () => {
  const { name, role, id } =
    useParams<{ name: string; role: string; id: string }>()
  const editing = useQuery().has('edit') || id === 'new'
  const enabledConfig = useConfigEnabled()

  const tableinfo = useTableInfo(name)
  const { document, isFetching } = useDocument(tableinfo, role, id)
  const { state: title } = useDocumentTitle(tableinfo)
  const formRef = useRef()
  if (!tableinfo) return null
  return (
    <HeaderTitleWrapper
      title={title}
      component={
        <DocumentTitle
          editable={enabledConfig}
          tableinfo={tableinfo}
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
                      tableinfo={tableinfo}
                      role={role}
                      editable={enabledConfig}
                      document={document}
                    />
                  }
                  toolbar={
                    <DocumentToolbar
                      tableinfo={tableinfo}
                      role={role}
                      document={document}
                      edit={editing}
                      formRef={formRef}
                    />
                  }
                >
                  <DocumentComponentWrapper
                    config={enabledConfig}
                    tableinfo={tableinfo}
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
export const DocumentPage = () => (
  <PrivateRoute>
    <Page />
  </PrivateRoute>
)
