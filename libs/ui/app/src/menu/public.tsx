import { MenuItem } from '@platyplus/layout'

// * 'System' side menu e.g. login, register, home page...
export const PublicMenu: React.FC<
  Record<'home' | 'login' | 'register', { enabled?: boolean; title?: string }>
> = ({ home, login, register }) => (
  <>
    {home.enabled && <MenuItem icon="home" title={home.title} href="/" />}
    {login.enabled && (
      <MenuItem icon="sign-in" title={login.title} href="/login" />
    )}
    {register.enabled && (
      <MenuItem icon="user-plus" title={register.title} href="/register" />
    )}
  </>
)
