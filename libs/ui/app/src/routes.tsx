import { Route, Routes } from 'react-router-dom'

import {
  IndexPage,
  HomePage,
  RegisterPage,
  LoginPage,
  CollectionPage,
  DocumentPage,
  PageNotFound,
  ProfilePage,
  PagePage
} from './pages'
import { RoutesConfig } from './types'
import { useConfigEnabled } from '@platyplus/react-rxdb-hasura'
import {
  ConfigPage,
  ConfigCollectionsPage,
  ConfigCollectionPage,
  ConfigPagesPage,
  ConfigPagePage,
  ConfigMenuPage
} from './config'

// * dynamic import depending on the routes config
export const PlatyplusRoutes: React.FC<RoutesConfig> = ({
  title,
  login,
  register,
  home,
  profile,
  notFound
}) => {
  const configEnabled = useConfigEnabled()
  return (
    <Routes>
      <Route path={`/collections/:role/:name`} element={<CollectionPage />} />
      <Route path={`/collections/:role/:name/:id`} element={<DocumentPage />} />
      <Route path={`/pages/:slug`} element={<PagePage />} />
      {configEnabled && <Route path={`/config`} element={<ConfigPage />} />}
      {configEnabled && (
        <Route
          path={`/config/collections`}
          element={<ConfigCollectionsPage />}
        />
      )}
      {configEnabled && (
        <Route
          path={`/config/collections/:id`}
          element={<ConfigCollectionPage />}
        />
      )}
      {configEnabled && (
        <Route path={`/config/pages`} element={<ConfigPagesPage />} />
      )}
      {configEnabled && (
        <Route path={`/config/pages/:id`} element={<ConfigPagePage />} />
      )}
      {configEnabled && (
        <Route path={`/config/menu`} element={<ConfigMenuPage />} />
      )}
      {login.enabled && (
        <Route path="/login" element={<LoginPage title={login.title} />} />
      )}
      {register.enabled && (
        <Route
          path="/register"
          element={<RegisterPage title={register.title} />}
        />
      )}
      {home.enabled && (
        <Route path="/home" element={<HomePage title={home.title} />} />
      )}
      {profile.enabled && (
        <Route
          path="/profile"
          element={<ProfilePage title={profile.title} />}
        />
      )}
      <Route path="/" element={<IndexPage title={title} />} />

      {notFound.enabled && <Route path="*" element={<PageNotFound />} />}
    </Routes>
  )
}
