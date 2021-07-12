import { Register } from '@platyplus/auth'
import { useWindowTitle } from '@platyplus/layout'
import { PageFunction } from './types'

export const RegisterPage: PageFunction = ({ title }) => {
  useWindowTitle(title)
  return <Register />
}
export default RegisterPage
