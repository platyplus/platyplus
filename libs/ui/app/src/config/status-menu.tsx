import React, { useMemo } from 'react'
import {
  Badge,
  IconButton,
  Icon,
  Whisper,
  Dropdown,
  Popover,
  BadgeProps
} from 'rsuite'
import { useNavigate, useLocation } from 'react-router-dom'
import { WhisperInstance } from 'rsuite/lib/Whisper'

import {
  useAppConfig,
  useConfigEnabled,
  useCountConfigChanges
} from '@platyplus/react-rxdb-hasura'

const MainButton: React.FC<BadgeProps> = ({ content, onClick }) => (
  <Badge content={content}>
    <IconButton circle icon={<Icon icon="wrench" />} onClick={onClick} />
  </Badge>
)

export const ConfigStatusMenuItem: React.FC = () => {
  const enabled = useConfigEnabled()
  const countChanges = useCountConfigChanges()
  const location = useLocation()
  const triggerRef = React.createRef<WhisperInstance>()
  const navigate = useNavigate()
  const { state, setState } = useAppConfig()
  const canSetAsHome = useMemo(
    () =>
      state.home !== location.pathname &&
      !location.pathname.startsWith('/config'),
    [state, location.pathname]
  )
  const nonEmptyMenu = useMemo(
    () => canSetAsHome || countChanges,
    [canSetAsHome, countChanges]
  )
  const trigger = useMemo(
    () => (nonEmptyMenu ? 'hover' : 'none'),
    [nonEmptyMenu]
  )
  if (!enabled) return null
  // * Only one possible action: go to the config page. Make it possible in clicking on the icon directly
  if (!canSetAsHome)
    return (
      <MainButton
        content={countChanges}
        onClick={() => {
          navigate('/config')
        }}
      />
    )
  // * More than one option: show the dropdown menu
  return (
    <Whisper
      placement="bottomEnd"
      trigger={trigger}
      triggerRef={triggerRef}
      enterable
      speaker={
        <Popover full>
          <Dropdown.Menu>
            {countChanges && (
              <Dropdown.Item
                onSelect={async () => {
                  triggerRef.current.close()
                  navigate('/config')
                }}
              >
                See changes
              </Dropdown.Item>
            )}
            {canSetAsHome && (
              <Dropdown.Item
                onSelect={async () => {
                  setState({ home: location.pathname })
                  triggerRef.current.close()
                }}
              >
                Set as home page
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Popover>
      }
    >
      <MainButton content={countChanges} />
    </Whisper>
  )
}
