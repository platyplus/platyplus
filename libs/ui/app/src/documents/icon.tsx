import { Icon, IconProps } from 'rsuite'

import { usePropertyIcon } from '@platyplus/react-rxdb-hasura'
import { TableInformation } from '@platyplus/rxdb-hasura'

export const PropertyIcon: React.FC<
  Omit<IconProps, 'icon'> & {
    tableinfo: TableInformation
    name: string
  }
> = ({ tableinfo, name, ...props }) => {
  const [icon] = usePropertyIcon(tableinfo, name)
  if (!icon) return null
  return <Icon {...props} icon={icon} style={{ paddingRight: '10px' }} />
}
