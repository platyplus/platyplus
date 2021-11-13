import { useAuthenticated } from '@platyplus/hbp'
import { Navigate, RouteProps, useLocation } from 'react-router-dom'

export const PublicRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const location = useLocation()
  const signedIn = useAuthenticated()

  if (!signedIn) return <div>{children}</div>

  return (
    <Navigate
      replace
      to={{
        pathname: '/'
      }}
      state={{ from: location }}
    />
  )
}
