import { Icon, IconProps } from 'rsuite'

import { usePropertyIcon } from '@platyplus/react-rxdb-hasura'
import { TableInformation } from '@platyplus/rxdb-hasura'

export const PropertyIcon: React.FC<
  Omit<IconProps, 'icon'> & {
    tableInfo: TableInformation
    name: string
  }
> = ({ tableInfo, name, ...props }) => {
  const [icon] = usePropertyIcon(tableInfo, name)
  if (!icon) return null
  return <Icon {...props} icon={icon} style={{ paddingRight: '10px' }} />
}
