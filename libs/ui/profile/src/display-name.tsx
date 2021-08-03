import { Contents } from '@platyplus/rxdb-hasura'
import { FunctionComponent } from 'react'

export const DisplayName: FunctionComponent<{ profile: Contents }> = ({
  profile
}) => {
  if (!profile) return null
  return <span>{profile.display_name}</span>
}

export default DisplayName
