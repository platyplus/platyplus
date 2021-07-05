import { NotFound } from '@platyplus/navigation'
import { usePageTitle } from '@platyplus/layout'

export const PageNotFound: React.FC = () => {
  usePageTitle('Page not found')
  return <NotFound />
}

export default PageNotFound
