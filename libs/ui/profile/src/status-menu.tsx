import React, { FunctionComponent } from 'react'
import { Whisper, Popover, Button, Loader } from 'rsuite'
import { WhisperInstance } from 'rsuite/lib/Whisper'
import Avatar from './avatar'
import DisplayName from './display-name'

import { useProfile } from './hook'

const PopoverWithLoader = React.forwardRef((props, ref) => {
  // TODO weird stuff. Won't align correctly if no 'waiting' step
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1)
  }, [])

  return (
    <Popover ref={ref} {...props} full>
      {loading ? (
        <Loader content="Loading..." />
      ) : (
        <div>
          <Avatar />
          Coucou <DisplayName />
        </div>
      )}
    </Popover>
  )
})

export const ProfileStatusMenu: FunctionComponent = (props) => {
  const profile = useProfile()

  const triggerRef = React.createRef<WhisperInstance>()
  // To close: triggerRef.current.close()
  if (profile)
    return (
      <Whisper
        placement="bottomEnd"
        trigger="hover"
        triggerRef={triggerRef}
        enterable
        speaker={<PopoverWithLoader />}
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
