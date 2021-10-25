import { Icon, IconButton, Tooltip, Whisper } from 'rsuite'
import { useTheme } from './loader'

export const ThemeToggle: React.FC = () => {
  const [value, toggle] = useTheme()
  const tooltip = <Tooltip>Toggle dark/light mode</Tooltip>
  return (
    <div>
      <Whisper placement="bottomEnd" trigger="hover" speaker={tooltip}>
        <IconButton
          onClick={toggle}
          style={{ color: 'gold' }}
          icon={
            value === 'light' ? <Icon icon="sun-o" /> : <Icon icon={'moon-o'} />
          }
          circle
        />
      </Whisper>
    </div>
  )
}
