import { useEffect, useRef } from 'react'
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

export const DocumentPage: React.FC = () => {
  const { name, role, id } =
    useParams<{ name: string; role: string; id: string }>()
  const editing = useQuery().has('edit') || id === 'new'
  const enabledConfig = useConfigEnabled()

  const tableInfo = useTableInfo(name)
  const { document, isFetching } = useDocument(tableInfo, role, id)
  const [title] = useDocumentTitle(tableInfo)
  const formRef = useRef()
  if (!tableInfo) return null
  return (
    <HeaderTitleWrapper
      title={title}
      component={
        <DocumentTitle
          editable={enabledConfig}
          tableInfo={tableInfo}
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
                      tableInfo={tableInfo}
                      role={role}
                      editable={enabledConfig}
                      document={document}
                    />
                  }
                  toolbar={
                    <DocumentToolbar
                      tableInfo={tableInfo}
                      role={role}
                      document={document}
                      edit={editing}
                      formRef={formRef}
                    />
                  }
                >
                  <DocumentComponentWrapper
                    config={enabledConfig}
                    tableInfo={tableInfo}
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
