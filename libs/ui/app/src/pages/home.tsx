import { Animation } from 'rsuite'
import {
  useConfigStore,
  useContentsCollections
} from '@platyplus/react-rxdb-hasura'
import { DisplayName, useProfile } from '@platyplus/profile'
import { HeaderTitleWrapper } from '@platyplus/layout'

export const HomePage: React.FC<{ title?: string }> = ({
  title = 'Home Page'
}) => {
  const collections = useContentsCollections()
  const profile = useProfile()
  const hasChanges = useConfigStore((state) => !!state.countChanges())
  return (
    <HeaderTitleWrapper title={title}>
      <Animation.Fade in={!!profile}>
        {(props, ref) => (
          <div {...props}>
            <div>
              <h2>
                Welcome, <DisplayName profile={profile} />
              </h2>
              {hasChanges ? 'CHANGES' : 'NO CHANGES'}
              {Object.keys(collections).map((key) => (
                <div key={key}>{key}</div>
              ))}
            </div>
          </div>
        )}
      </Animation.Fade>
    </HeaderTitleWrapper>
  )
}

export default HomePage
