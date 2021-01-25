import auth from './pages/auth/routes'
import contents from './pages/contents/routes'
import profile from './pages/profile/routes'
export const routes = [...auth, ...contents, ...profile]
