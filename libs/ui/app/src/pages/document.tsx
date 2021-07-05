import { usePageTitle } from '@platyplus/layout'
import { Loading, useQuery } from '@platyplus/navigation'
import { useDocument } from '@platyplus/react-rxdb-hasura'
import { useParams } from 'react-router'
import { Link, useLocation } from 'react-router-dom'

export const DocumentPage: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>()
  const query = useQuery()
  const edit = query.has('edit')
  const location = useLocation()

  const { document, isFetching } = useDocument(name, id)
  usePageTitle(document?.label)
  // TODO loading
  if (isFetching) return <Loading />
  else
    return (
      <div>
        {document.label} - {edit ? 'edit' : 'read'}
        <div>
          {edit ? (
            <Link to={location.pathname} replace>
              Cancel
            </Link>
          ) : (
            <Link to={`${location.pathname}?edit`} replace>
              Edit
            </Link>
          )}
        </div>
      </div>
    )
}

export default DocumentPage
