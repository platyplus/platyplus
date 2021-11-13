import { HeaderTitleWrapper } from '@platyplus/layout'
import { Link, Navigate, Route } from 'react-router-dom'
import { useAuthenticated } from '@platyplus/hbp'
import { useAppConfig } from '@platyplus/react-rxdb-hasura'

export const IndexPage: React.FC<{ title?: string }> = ({
  title = 'Index page'
}) => {
  const signedIn = useAuthenticated()
  const { state, isFetching } = useAppConfig()
  if (signedIn) {
    if (isFetching) return null
    return <Navigate to={state.home || '/home'} />
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
