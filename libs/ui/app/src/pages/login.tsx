import { Login } from '@platyplus/auth'
import { HeaderTitleWrapper } from '@platyplus/layout'
import { PageFunction } from './types'

export const LoginPage: PageFunction = ({ title }) => (
  <HeaderTitleWrapper title={title}>
    <Login />
  </HeaderTitleWrapper>
)

export default LoginPage
