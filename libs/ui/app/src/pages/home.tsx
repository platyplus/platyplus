import { PrivateRoute } from '@platyplus/auth'
import { useContentsCollections } from '@platyplus/react-rxdb-hasura'
import { useRoleMenu } from '../menu'
import { Avatar, DisplayName, useProfile } from '@platyplus/profile'
import { usePageTitle } from '@platyplus/layout'

export const Home: React.FC<{ title: string }> = ({ title }) => {
  usePageTitle(title)
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
  else return <div>loading profile...</div>
}

export const HomePage = () => (
  <PrivateRoute exact path="/home">
    <div>home???</div>
  </PrivateRoute>
)

export default HomePage
