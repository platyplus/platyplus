import { Animation } from 'rsuite'
import {
  useConfigStore,
  useContentsCollections
} from '@platyplus/react-rxdb-hasura'
import { Avatar, DisplayName, useProfile } from '@platyplus/profile'
import { HeaderTitleWrapper } from '@platyplus/layout'

import { useRoleMenu } from '../menu'

export const HomePage: React.FC<{ title?: string }> = ({
  title = 'Home Page'
}) => {
  const collections = useContentsCollections()
  const menu = useRoleMenu()
  const profile = useProfile()
  const changes = useConfigStore((state) => state.hasChanges())
  return (
    <HeaderTitleWrapper title={title}>
      <Animation.Fade in={!!profile}>
        {(props, ref) => (
          <div {...props}>
            <div>
              <h2>
                Welcome, <DisplayName profile={profile} />
              </h2>
              {changes ? 'CHANGES' : 'NO CHANGES'}
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
          </div>
        )}
      </Animation.Fade>
    </HeaderTitleWrapper>
  )
}

export default HomePage
