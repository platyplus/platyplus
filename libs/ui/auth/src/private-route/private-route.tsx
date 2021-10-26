import { Route, Redirect, RouteProps } from 'react-router-dom'

import { Loading } from '@platyplus/navigation'
import { useIsTableInfoReady } from '@platyplus/react-rxdb-hasura'
import { useAuthenticated } from '@platyplus/hbp'

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const signedIn = useAuthenticated()
  const tableInfoReady = useIsTableInfoReady()

  return (
    <Route
      {...rest}
      render={({ location }) => {
        // user is logged-in
        if (signedIn === null) {
          return <Loading backdrop content="loading authentication status..." />
        }
        if (!tableInfoReady) {
          return <Loading backdrop content="loading tables information..." />
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
