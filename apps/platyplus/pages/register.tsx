import { Register } from '@platyplus/auth'
import { usePageTitle } from '@platyplus/layout'
import { FunctionComponent } from 'react'

export const LoginPage: FunctionComponent = () => {
  usePageTitle('Register')
  return <Register />
}

export default LoginPage
