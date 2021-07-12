import { Login } from '@platyplus/auth'
import { useWindowTitle } from '@platyplus/layout'
import { PageFunction } from './types'

export const LoginPage: PageFunction = ({ title }) => {
  useWindowTitle(title)
  return <Login />
}

export default LoginPage
