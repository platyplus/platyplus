import { usePageTitle } from '@platyplus/layout'
import { useAuth } from '@nhost/react-auth'
// import { Loading } from '@platyplus/navigation'
import { Link, Redirect } from 'react-router-dom'

export const IndexPage: React.FC<{ title?: string }> = ({ title }) => {
  usePageTitle(title || 'Index page')
  const { signedIn } = useAuth()
  // const router = useHistory()
  if (signedIn) {
    // router.replace('/home')
    // return <Loading />
    return <Redirect to="/home" />
  } else
    return (
      <div>
        <h2>Welcome, stranger</h2>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/register">Register</Link>
      </div>
    )
}

export default IndexPage
