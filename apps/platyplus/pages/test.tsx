import { PrivateRoute } from '@platyplus/auth'

const TestPage = () => {
  return <div>authenticated!!</div>
}

export default PrivateRoute(TestPage)
