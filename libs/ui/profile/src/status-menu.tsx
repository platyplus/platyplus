import React, { FunctionComponent } from 'react'
import { Whisper, Popover } from 'rsuite'
import { WhisperInstance } from 'rsuite/lib/Whisper'
import Avatar from './avatar'

import { useProfile } from './hook'

export const ProfileStatusMenu: FunctionComponent = (props) => {
  const profile = useProfile()

  const triggerRef = React.createRef<WhisperInstance>()
  // To close: triggerRef.current.close()
  if (profile)
    return (
      <Whisper
        placement="leftEnd"
        trigger="hover"
        triggerRef={triggerRef}
        enterable
        speaker={
          <Popover full>
            <Avatar circle size="lg" />
            <div>coucou</div>
          </Popover>
        }
      >
        <Avatar
          circle
          style={{ height: '35px', width: '35px', cursor: 'pointer' }}
        />
      </Whisper>
    )
  else return null
}

export default ProfileStatusMenu
