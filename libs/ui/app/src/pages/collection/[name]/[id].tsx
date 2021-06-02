import { usePageTitle } from '@platyplus/layout'
import { useDocument } from '@platyplus/react-rxdb-hasura'
import { privateRoute } from '@platyplus/auth'
import { useHistory } from 'react-router'

const DocumentPage: React.FC = () => {
  const router = useHistory()
  const name = router.query.name as string
  const id = router.query.id as string
  const edit = 'edit' in router.query
  const { document, isFetching } = useDocument(name, id)
  usePageTitle(document?.label)
  // TODO loading
  if (isFetching) return <div>loading.....</div>
  else return <div>{document.test}</div>
}

export default privateRoute(DocumentPage)
