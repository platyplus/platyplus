import { privateRoute } from '@platyplus/auth'

export const SettingsPage: React.FC = () => {
  return <div>authenticated!!</div>
}

export default privateRoute(SettingsPage)
