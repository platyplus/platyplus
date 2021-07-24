import { Badge, IconButton, Icon } from 'rsuite'
import { useHistory } from 'react-router-dom'
import { useConfigEnabled, useConfigStore } from '@platyplus/react-rxdb-hasura'

export const ConfigStatusMenuItem: React.FC = () => {
  const enabled = useConfigEnabled()
  const history = useHistory()
  const countChanges = useConfigStore((state) => state.countChanges() || false)
  if (enabled)
    return (
      <Badge content={countChanges}>
        <IconButton
          circle
          icon={<Icon icon="wrench" />}
          onClick={() => history.push('/config')}
        />
      </Badge>
    )
  else return null
}
