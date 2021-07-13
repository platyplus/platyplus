import { NotFound } from '@platyplus/navigation'
import { HeaderTitleWrapper } from '@platyplus/layout'

export const PageNotFound: React.FC = () => (
  <HeaderTitleWrapper title={'Page not found'}>
    {' '}
    <NotFound />
  </HeaderTitleWrapper>
)

export default PageNotFound
