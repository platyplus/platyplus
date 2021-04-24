import { PrivateRoute } from '@platyplus/auth'
import { FunctionComponent } from 'react'

export const TestPage: FunctionComponent = () => {
  return <div>authenticated!!</div>
}

export default PrivateRoute(TestPage)
