import { DocumentPanel, usePageTitle } from '@platyplus/layout'
import { Loading, useQuery } from '@platyplus/navigation'
import { useDocument } from '@platyplus/react-rxdb-hasura'
import { useParams } from 'react-router'
import { DocumentToolbar } from '../common'

import { DocumentComponentWrapper } from '../documents'

export const DocumentPage: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>()
  const editing = useQuery().has('edit')
  const { document, isFetching } = useDocument(name, id)
  usePageTitle(document?.label)
  if (isFetching) return <Loading />
  else
    return (
      <DocumentPanel
        title={document.label}
        toolbar={<DocumentToolbar document={document} edit={editing} />}
      >
        <DocumentComponentWrapper document={document} edit={editing} />
      </DocumentPanel>
    )
}
