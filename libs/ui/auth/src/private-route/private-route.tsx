import { useAuth } from '@nhost/react-auth'
import { Route, Redirect } from 'react-router-dom'

export function AuthGate({ children, ...rest }) {
  const { signedIn } = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) => {
        // user is logged-in
        if (signedIn === null) {
          return <div>Loading auth status...</div>
        }

        if (!signedIn) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
        }
        return children
      }}
    />
  )
}
