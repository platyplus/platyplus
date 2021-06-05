import { Avatar, DisplayName, useProfile } from '@platyplus/profile'
import { PageFunction } from './types'
import { usePageTitle } from '@platyplus/layout'

const Profile: PageFunction = ({ title }) => {
  usePageTitle(title)
  const profile = useProfile()
  if (profile)
    return (
      <div>
        <h2>
          <DisplayName profile={profile} />
        </h2>
        <Avatar circle />
      </div>
    )
  else return <div>loading...</div>
}

export default Profile
