import { Login } from '@platyplus/auth'
import { usePageTitle } from '@platyplus/layout'
import { PageFunction } from './types'

const LoginPage: PageFunction = ({ title }) => {
  usePageTitle(title)
  return <Login />
}

export default LoginPage
