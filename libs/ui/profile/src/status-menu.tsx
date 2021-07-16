import React, { FunctionComponent } from 'react'
import { Whisper, Popover, Dropdown, Icon } from 'rsuite'
import { useAuth } from '@nhost/react-auth'
import { WhisperInstance } from 'rsuite/lib/Whisper'
import { useHbp } from '@platyplus/hbp'
import Avatar from './avatar'
import { useHistory } from 'react-router-dom'
export const ProfileStatusMenu: FunctionComponent = () => {
  const { auth } = useHbp()
  const { signedIn } = useAuth()
  const triggerRef = React.createRef<WhisperInstance>()
  const router = useHistory()
  if (signedIn)
    return (
      <Whisper
        placement="bottomEnd"
        trigger="hover"
        triggerRef={triggerRef}
        enterable
        speaker={
          <Popover full>
            <Dropdown.Menu>
              <Dropdown.Item
                onSelect={async () => {
                  triggerRef.current.close()
                  router.push('/profile')
                }}
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                icon={<Icon icon="sign-out" />}
                onSelect={async () => {
                  triggerRef.current.close()
                  await auth.logout()
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Popover>
        }
      >
        <Avatar
          circle
          style={{
            height: '35px',
            width: '35px',
            cursor: 'pointer'
          }}
        />
      </Whisper>
    )
  else return null
}

export default ProfileStatusMenu
