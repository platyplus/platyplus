import React from 'react'
import { useHistory } from 'react-router-dom'
import { Whisper, Popover, Dropdown, Icon } from 'rsuite'
import { WhisperInstance } from 'rsuite/lib/Whisper'

import { useAuthenticated, useHbp } from '@platyplus/hbp'
import { useDB, useLogout } from '@platyplus/react-rxdb-hasura'

import Avatar from './avatar'

export const ProfileStatusMenu: React.FC = () => {
  const { auth } = useHbp()
  const db = useDB()
  const signedIn = useAuthenticated()
  const triggerRef = React.createRef<WhisperInstance>()
  const router = useHistory()
  const logout = useLogout()
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
                  // await auth.logout()
                  // await db.remove()
                  // router.push('/')
                  await logout()
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
