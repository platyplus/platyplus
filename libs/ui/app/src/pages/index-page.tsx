import { HeaderTitleWrapper } from '@platyplus/layout'
import { Link, Redirect } from 'react-router-dom'
import { useAuthenticated } from '@platyplus/hbp'

export const IndexPage: React.FC<{ title?: string }> = ({
  title = 'Index page'
}) => {
  const signedIn = useAuthenticated()
  if (signedIn) {
    return <Redirect to="/home" />
  } else
    return (
      <HeaderTitleWrapper title={title}>
        <h2>Welcome, stranger</h2>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/register">Register</Link>
      </HeaderTitleWrapper>
    )
}

export default IndexPage
