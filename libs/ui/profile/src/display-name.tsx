import { FunctionComponent } from 'react'
import { useProfile } from './hook'

export const DisplayName: FunctionComponent = () => {
  const profile = useProfile()
  if (profile) return <div>{profile.display_name}</div>
  else return null
}

export default DisplayName
