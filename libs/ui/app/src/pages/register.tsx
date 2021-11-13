import { PublicRoute, Register } from '@platyplus/auth'
import { HeaderTitleWrapper } from '@platyplus/layout'
import { PageFunction } from './types'

const Page: PageFunction = ({ title }) => (
  <HeaderTitleWrapper title={title}>
    <Register />
  </HeaderTitleWrapper>
)

export const RegisterPage: PageFunction = (props) => (
  <PublicRoute>
    <Page {...props} />
  </PublicRoute>
)
