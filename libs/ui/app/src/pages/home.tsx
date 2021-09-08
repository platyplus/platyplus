import { Animation } from 'rsuite'
import { DisplayName, useProfile } from '@platyplus/profile'
import { HeaderTitleWrapper } from '@platyplus/layout'

export const HomePage: React.FC<{ title?: string }> = ({
  title = 'Home Page'
}) => {
  const { value: profile } = useProfile()
  return (
    <HeaderTitleWrapper title={title}>
      <Animation.Fade in={!!profile}>
        {(props) => (
          <div {...props}>
            <div>
              <h2>
                Welcome, <DisplayName profile={profile} />
              </h2>
              Ideally, store this page in a new `platyplus.pages` table, that
              would store a markdown field.
              <br />
              This field would also be a handlebars template, with as context
              some values like profile (and other singletons), roles,
              collections, and why not documents.
            </div>
          </div>
        )}
      </Animation.Fade>
    </HeaderTitleWrapper>
  )
}

export default HomePage
