import { usePageTitle } from '@platyplus/layout'
import { Loading, useQuery } from '@platyplus/navigation'
import {
  useDocument,
  useFormChanged,
  useResetForm
} from '@platyplus/react-rxdb-hasura'
import { useParams } from 'react-router'
import { Link, useLocation } from 'react-router-dom'

import { DocumentComponentWrapper } from '../documents'

export const DocumentPage: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>()
  const query = useQuery()
  const edit = query.has('edit')
  const location = useLocation()

  const { document, isFetching } = useDocument(name, id)
  usePageTitle(document?.label)
  const reset = useResetForm(document)
  const changed = useFormChanged(document)
  // TODO loading
  if (isFetching) return <Loading />
  else
    return (
      <div>
        {document.label} - {edit ? 'edit' : 'read'}
        <div>{changed ? 'changed' : 'not changed'}</div>
        <div>
          {edit ? (
            <>
              <Link to={location.pathname} replace>
                Cancel
              </Link>
              <div onClick={reset}>Reset</div>
            </>
          ) : (
            <Link to={`${location.pathname}?edit`} replace>
              Edit
            </Link>
          )}
        </div>
        <DocumentComponentWrapper document={document} edit={edit} />
      </div>
    )
}

export default DocumentPage
