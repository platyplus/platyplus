import { useAuth } from '@nhost/react-auth'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import { Loading } from '@platyplus/navigation'
import { useIsMetadataReady } from '@platyplus/react-rxdb-hasura'

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { signedIn } = useAuth()
  const metadataReady = useIsMetadataReady()

  return (
    <Route
      {...rest}
      render={({ location }) => {
        // user is logged-in
        if (signedIn === null) {
          return <Loading backdrop />
        }
        if (!metadataReady) {
          return <Loading backdrop />
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
