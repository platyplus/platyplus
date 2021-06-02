import { useAuth } from '@nhost/react-auth'
import { Route, Redirect, RouteProps } from 'react-router-dom'

export const PublicRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { signedIn } = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) => {
        // user is logged-in
        if (signedIn === null) {
          return <div>Loading auth status...</div>
        }

        if (!signedIn) return children

        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }}
    />
  )
}
