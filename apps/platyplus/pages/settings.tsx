import { privateRoute } from '@platyplus/auth'
import { FunctionComponent } from 'react'

export const SettingsPage: FunctionComponent = () => {
  return <div>authenticated!!</div>
}

export default privateRoute(SettingsPage)
