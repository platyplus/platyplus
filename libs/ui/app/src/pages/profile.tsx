import { Animation } from 'rsuite'
import { DisplayName, useProfile } from '@platyplus/profile'
import {
  DocumentPanel,
  HeaderTitleWrapper,
  useWindowTitle
} from '@platyplus/layout'
import { useQuery } from '@platyplus/navigation'
import { PageFunction } from './types'
import { DocumentComponentWrapper } from '../documents'
import { DocumentToolbar } from '../common'

export const ProfilePage: PageFunction = ({ title }) => {
  useWindowTitle(title)
  const profile = useProfile()
  const editing = useQuery().has('edit')
  // TODO profile actions e.g. change/reset password
  return (
    <HeaderTitleWrapper title={() => <span>{title}</span>}>
      <Animation.Fade in={!!profile}>
        {(props, ref) => (
          <div {...props}>
            <DocumentPanel
              title={<DisplayName profile={profile} />}
              toolbar={<DocumentToolbar document={profile} edit={editing} />}
            >
              <DocumentComponentWrapper document={profile} edit={editing} />
            </DocumentPanel>
          </div>
        )}
      </Animation.Fade>
    </HeaderTitleWrapper>
  )
}
