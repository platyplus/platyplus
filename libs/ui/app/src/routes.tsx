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
  ProfilePage,
  ConfigTablesPage,
  ConfigTablePage,
  ConfigPage,
  ConfigMenuPage
} from './pages'
import { RoutesConfig } from './types'
import { useConfigEnabled } from '@platyplus/react-rxdb-hasura'

// * dynamic import depending on the routes config
export const Routes: React.FC<RoutesConfig> = ({
  title,
  login,
  register,
  home,
  profile,
  notFound
}) => {
  const configEnabled = useConfigEnabled()
  return (
    <Switch>
      <PrivateRoute
        path={`/collection/:role/:name`}
        exact
        children={<CollectionPage />}
      />
      <PrivateRoute
        path={`/collection/:role/:name/:id`}
        exact
        children={<DocumentPage />}
      />
      {configEnabled && (
        <PrivateRoute path={`/config`} exact children={<ConfigPage />} />
      )}
      {configEnabled && (
        <PrivateRoute
          path={`/config/tables`}
          exact
          children={<ConfigTablesPage />}
        />
      )}
      {configEnabled && (
        <PrivateRoute
          path={`/config/tables/:id`}
          exact
          children={<ConfigTablePage />}
        />
      )}
      {configEnabled && (
        <PrivateRoute
          path={`/config/menu`}
          exact
          children={<ConfigMenuPage />}
        />
      )}
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
