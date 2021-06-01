import { Route, Switch } from 'react-router-dom'
import { createClient } from 'nhost-js-sdk'
import 'rsuite/lib/styles/index.less' // or 'rsuite/dist/styles/rsuite-default.css'

import { Layout, Logo, MenuItem } from '@platyplus/layout'
import { HbpProvider, useAuthenticated } from '@platyplus/hbp'
import { RxDBHasuraProvider } from '@platyplus/react-rxdb-hasura'
import '../assets/theme.less'
import { useRoleMenu } from '../lib/menu'
import Login from '../pages/login'
import Register from '../pages/register'
import { Home } from '../pages/home'
import IndexPage from '../pages/index'
import { AuthGate } from '@platyplus/auth'

const publicSideMenu: MenuItem[] = [
  {
    icon: 'home',
    title: 'Home',
    href: '/'
  },
  {
    icon: 'sign-in',
    title: 'Login',
    href: '/login'
  },
  {
    icon: 'user-plus',
    title: 'Register',
    href: '/register'
  }
]
const { auth, storage } = createClient({
  baseURL: process.env.NX_HBP_ENDPOINT
})

// TODO move this to a lib e.g. @platyplus/app
type RoutesConfig = Partial<
  Record<'login' | 'register', { enabled?: boolean; title?: string }>
>
// TODO dynamic import depending on the routes config
const Routes: React.FC<RoutesConfig> = ({ login, register }) => (
  <Switch>
    {login?.enabled !== false && (
      <Route path="/login">
        <Login title="Login" />
      </Route>
    )}
    {register?.enabled !== false && (
      <Route path="/register">
        <Register title="Register" />
      </Route>
    )}
    {/* // TODO params
     */}
    <AuthGate exact path="/home">
      <Home title={login?.title || 'Home page'} />
    </AuthGate>
    <Route exact path="/" component={IndexPage} />
    <Route>
      <div>no match</div>
    </Route>
  </Switch>
)

// TODO move this to a lib e.g. @platyplus/app
const LayoutWrapper = () => {
  const authenticated = useAuthenticated(auth)
  const authSideMenu = useRoleMenu()
  return (
    <Layout
      logo={<Logo title="Platyplus" />}
      sideMenu={authenticated ? authSideMenu : publicSideMenu}
    >
      <Routes />
    </Layout>
  )
}

// TODO move this to a lib e.g. @platyplus/app
function App() {
  return (
    <HbpProvider auth={auth} storage={storage}>
      <RxDBHasuraProvider auth={auth}>
        <LayoutWrapper />
      </RxDBHasuraProvider>
    </HbpProvider>
  )
}
export default App
