import { NotFound } from '@platyplus/navigation'
import { useWindowTitle } from '@platyplus/layout'

export const PageNotFound: React.FC = () => {
  useWindowTitle('Page not found')
  return <NotFound />
}

export default PageNotFound
