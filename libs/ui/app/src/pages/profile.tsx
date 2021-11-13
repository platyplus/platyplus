import { Animation } from 'rsuite'
import { DisplayName, useProfile } from '@platyplus/profile'
import { DocumentPanel, HeaderTitleWrapper } from '@platyplus/layout'
import { useQuery } from '@platyplus/navigation'
import { PageFunction } from './types'
import { DocumentComponentWrapper, DocumentToolbar } from '../documents'
import { useTableInfo } from '@platyplus/react-rxdb-hasura'
import { METADATA_ROLE } from '@platyplus/rxdb-hasura'
import { useLocation } from 'react-use'
import { PrivateRoute } from '@platyplus/auth'

const Page: PageFunction = ({ title }) => {
  const { value: profile } = useProfile()
  const editing = useQuery().has('edit')
  const tableinfo = useTableInfo('public.users')
  // TODO profile actions e.g. change/reset password
  const location = useLocation()
  const href = location.pathname
  if (!profile || !tableinfo) return null
  return (
    <HeaderTitleWrapper title={title} previous>
      <Animation.Fade in={!!profile}>
        {(props, ref) => (
          <div {...props}>
            <DocumentPanel
              title={<DisplayName profile={profile} />}
              toolbar={
                <DocumentToolbar
                  tableinfo={tableinfo}
                  role={METADATA_ROLE}
                  document={profile}
                  edit={editing}
                  href={href}
                />
              }
            >
              <DocumentComponentWrapper
                tableinfo={tableinfo}
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

export const ProfilePage: PageFunction = (props) => (
  <PrivateRoute>
    <Page {...props} />
  </PrivateRoute>
)
