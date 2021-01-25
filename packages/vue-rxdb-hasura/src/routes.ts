import authRoutes from './pages/auth/routes'
import contentsRoutes from './pages/contents/routes'
import profileRouts from './pages/profile/routes'
export { authRoutes, contentsRoutes, profileRouts }
export const allRoutes = [...authRoutes, ...contentsRoutes, ...profileRouts]
