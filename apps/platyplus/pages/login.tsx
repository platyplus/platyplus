import { Login } from '@platyplus/auth'
import { usePageTitle } from '@platyplus/layout'

const LoginPage = () => {
  usePageTitle('Login')
  return <Login />
}

export default LoginPage
