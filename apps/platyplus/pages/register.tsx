import { Register } from '@platyplus/auth'
import { usePageTitle } from '@platyplus/layout'

const LoginPage = () => {
  usePageTitle('Register')
  return <Register />
}

export default LoginPage
