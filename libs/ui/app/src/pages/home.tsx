import { PrivateRoute } from '@platyplus/auth'
import { useContentsCollections } from '@platyplus/react-rxdb-hasura'
import { Avatar, DisplayName, useProfile } from '@platyplus/profile'
import { usePageTitle } from '@platyplus/layout'
import { Loading } from '@platyplus/navigation'

import { useRoleMenu } from '../menu'

export const HomePage: React.FC<{ title?: string }> = ({ title }) => {
  usePageTitle(title || 'Home page')
  const collections = useContentsCollections()
  const menu = useRoleMenu()
  const profile = useProfile()
  if (profile)
    return (
      <div>
        <h2>
          Welcome, <DisplayName profile={profile} />
        </h2>
        {Object.keys(collections).map((key) => (
          <div key={key}>{key}</div>
        ))}
        <h3>Menu</h3>
        <div>
          {menu.map((item, index) => (
            <div key={index}>{JSON.stringify(item)}</div>
          ))}
        </div>
        <Avatar circle />
      </div>
    )
  else return <Loading />
}

export default HomePage
