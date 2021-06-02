import { Route, Switch } from 'react-router-dom'

import { PrivateRoute, PublicRoute } from '@platyplus/auth'

import Login from './pages/login'
import Register from './pages/register'
import { Home } from './pages/home'
import IndexPage from './pages/index'
import { AppConfig } from './types'

// * dynamic import depending on the routes config
export const Routes: React.FC<AppConfig> = ({
  login,
  register,
  home,
  notFound
}) => (
  <Switch>
    {login?.enabled !== false && (
      <PublicRoute path="/login">
        <Login title="Login" />
      </PublicRoute>
    )}
    {register?.enabled !== false && (
      <PublicRoute path="/register">
        <Register title="Register" />
      </PublicRoute>
    )}
    {home?.enabled !== false && (
      <>
        <PrivateRoute exact path="/home">
          <Home title={login?.title || 'Home page'} />
        </PrivateRoute>
        <Route exact path="/" component={IndexPage} />
      </>
    )}
    {notFound?.enabled !== false && (
      <Route>
        <div>no match</div>
      </Route>
    )}
  </Switch>
)
