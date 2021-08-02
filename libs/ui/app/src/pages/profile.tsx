import { Animation } from 'rsuite'
import { DisplayName, useProfile } from '@platyplus/profile'
import { DocumentPanel, HeaderTitleWrapper } from '@platyplus/layout'
import { useQuery } from '@platyplus/navigation'
import { PageFunction } from './types'
import { DocumentComponentWrapper, DocumentToolbar } from '../documents'
import { useMetadata } from '@platyplus/react-rxdb-hasura'
import { METADATA_ROLE } from '@platyplus/rxdb-hasura'

export const ProfilePage: PageFunction = ({ title }) => {
  const { value: profile } = useProfile()
  const editing = useQuery().has('edit')
  const metadata = useMetadata('public.users')
  // TODO profile actions e.g. change/reset password
  if (!metadata) return null
  return (
    <HeaderTitleWrapper title={title} previous>
      <Animation.Fade in={!!profile}>
        {(props, ref) => (
          <div {...props}>
            <DocumentPanel
              title={<DisplayName profile={profile} />}
              toolbar={
                <DocumentToolbar
                  metadata={metadata}
                  role={METADATA_ROLE}
                  document={profile}
                  edit={editing}
                />
              }
            >
              <DocumentComponentWrapper
                metadata={metadata}
                role={METADATA_ROLE}
                document={profile}
                edit={editing}
              />
            </DocumentPanel>
          </div>
        )}
      </Animation.Fade>
    </HeaderTitleWrapper>
  )
}
