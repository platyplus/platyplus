import React from 'react'
import { Whisper, Popover, Dropdown, Icon } from 'rsuite'
import { useHistory } from 'react-router-dom'
import { WhisperInstance } from 'rsuite/lib/Whisper'

import { useAuthenticated, useHbp } from '@platyplus/hbp'
import Avatar from './avatar'

export const ProfileStatusMenu: React.FC = () => {
  const { auth } = useHbp()
  const signedIn = useAuthenticated()
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
            // TODO 1px too low
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
