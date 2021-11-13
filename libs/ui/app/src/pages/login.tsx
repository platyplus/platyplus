import { Login, PublicRoute } from '@platyplus/auth'
import { HeaderTitleWrapper } from '@platyplus/layout'
import { PageFunction } from './types'

const Page: PageFunction = ({ title }) => (
  <HeaderTitleWrapper title={title}>
    <Login />
  </HeaderTitleWrapper>
)

export const LoginPage: PageFunction = (props) => (
  <PublicRoute>
    <Page {...props} />
  </PublicRoute>
)
