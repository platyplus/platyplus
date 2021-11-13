import { Route, RouteProps, Navigate, useLocation } from 'react-router-dom'

import { Loading } from '@platyplus/navigation'
import { useIsTableInfoReady } from '@platyplus/react-rxdb-hasura'
import { useAuthenticated } from '@platyplus/hbp'

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const signedIn = useAuthenticated()
  const tableInfoReady = useIsTableInfoReady()
  const location = useLocation()

  // return (
  //   <Route
  //     {...rest}
  //     children={({ location }) => {
  //       // user is logged-in
  if (signedIn === null) {
    return <Loading backdrop content="loading authentication status..." />
  }
  if (signedIn && !tableInfoReady) {
    return <Loading backdrop content="loading tables information..." />
  }
  if (!signedIn) {
    return (
      <Navigate
        replace
        to={{
          pathname: '/login'
        }}
        state={{ from: location }}
      />
    )
  }
  return <div>{children}</div>
  //       return children
  //     }}
  //   />
  // )
}
