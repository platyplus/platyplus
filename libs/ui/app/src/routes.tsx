import { Route, Switch } from 'react-router-dom'

import { PrivateRoute, PublicRoute } from '@platyplus/auth'
import { useContentsCollections } from '@platyplus/react-rxdb-hasura'

import {
  IndexPage,
  HomePage,
  RegisterPage,
  LoginPage,
  CollectionPage,
  DocumentPage,
  PageNotFound
} from './pages'
import { AppConfig } from './types'

// * dynamic import depending on the routes config
export const Routes: React.FC<AppConfig> = ({
  login,
  register,
  home,
  notFound
}) => {
  return (
    <Switch>
      <PrivateRoute
        path={`/collection/:name`}
        exact
        children={<CollectionPage />}
      />
      <PrivateRoute
        path={`/collection/:name/:id`}
        exact
        children={<DocumentPage />}
      />
      {login?.enabled !== false && (
        <PublicRoute path="/login">
          <LoginPage title="Login" />
        </PublicRoute>
      )}
      {register?.enabled !== false && (
        <PublicRoute path="/register">
          <RegisterPage title="Register" />
        </PublicRoute>
      )}
      {home?.enabled !== false && (
        <PrivateRoute exact path="/home">
          <HomePage title={login?.title || 'Home page'} />
        </PrivateRoute>
      )}
      <Route exact path="/" component={IndexPage} />
      {notFound?.enabled !== false && (
        <Route path="*">
          <PageNotFound />
        </Route>
      )}
    </Switch>
  )
}
