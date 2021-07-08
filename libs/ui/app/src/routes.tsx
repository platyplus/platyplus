import { Route, Switch } from 'react-router-dom'

import { PrivateRoute, PublicRoute } from '@platyplus/auth'

import {
  IndexPage,
  HomePage,
  RegisterPage,
  LoginPage,
  CollectionPage,
  DocumentPage,
  PageNotFound,
  ProfilePage
} from './pages'
import { RoutesConfig } from './types'

// * dynamic import depending on the routes config
export const Routes: React.FC<RoutesConfig> = ({
  title,
  login,
  register,
  home,
  profile,
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
      {login.enabled && (
        <PublicRoute path="/login">
          <LoginPage title={login.title} />
        </PublicRoute>
      )}
      {register.enabled && (
        <PublicRoute path="/register">
          <RegisterPage title={register.title} />
        </PublicRoute>
      )}
      {home.enabled && (
        <PrivateRoute exact path="/home">
          <HomePage title={home.title} />
        </PrivateRoute>
      )}
      {profile.enabled && (
        <PrivateRoute exact path="/profile">
          <ProfilePage title={profile.title} />
        </PrivateRoute>
      )}
      <Route exact path="/">
        <IndexPage title={title} />
      </Route>
      {notFound.enabled && (
        <Route path="*">
          <PageNotFound />
        </Route>
      )}
    </Switch>
  )
}
