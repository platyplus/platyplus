import { Login } from '@platyplus/auth'
import { usePageTitle } from '@platyplus/layout'
import { FunctionComponent } from 'react'

export const LoginPage: FunctionComponent = () => {
  usePageTitle('Login')
  return <Login />
}

export default LoginPage
