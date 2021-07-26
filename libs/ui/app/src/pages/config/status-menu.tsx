import { Badge, IconButton, Icon } from 'rsuite'
import { useHistory } from 'react-router-dom'
import {
  useConfigEnabled,
  useCountConfigChanges
} from '@platyplus/react-rxdb-hasura'

export const ConfigStatusMenuItem: React.FC = () => {
  const enabled = useConfigEnabled()
  const history = useHistory()
  const countChanges = useCountConfigChanges()
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
