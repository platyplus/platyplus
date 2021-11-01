import { MenuItem } from '@platyplus/layout'
import { HomeItem } from './home-item'

// * 'System' side menu e.g. login, register, home page...
export const PublicMenu: React.FC<
  Record<'home' | 'login' | 'register', { enabled?: boolean; title?: string }>
> = ({ home, login, register }) => (
  <>
    <HomeItem {...home} />
    {login.enabled && (
      <MenuItem icon="sign-in" title={login.title} href="/login" />
    )}
    {register.enabled && (
      <MenuItem icon="user-plus" title={register.title} href="/register" />
    )}
  </>
)
