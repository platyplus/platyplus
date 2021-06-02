import { Register } from '@platyplus/auth'
import { usePageTitle } from '@platyplus/layout'
import { PageFunction } from './types'

const RegisterPage: PageFunction = ({ title }) => {
  usePageTitle(title)
  return <Register />
}
export default RegisterPage
