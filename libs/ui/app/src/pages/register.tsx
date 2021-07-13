import { Register } from '@platyplus/auth'
import { HeaderTitleWrapper } from '@platyplus/layout'
import { PageFunction } from './types'

export const RegisterPage: PageFunction = ({ title }) => (
  <HeaderTitleWrapper title={title}>
    <Register />
  </HeaderTitleWrapper>
)

export default RegisterPage
