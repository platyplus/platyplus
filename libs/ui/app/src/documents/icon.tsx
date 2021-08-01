import { Icon, IconProps } from 'rsuite'

import { usePropertyIcon } from '@platyplus/react-rxdb-hasura'
import { ContentsCollection, Metadata, Property } from '@platyplus/rxdb-hasura'

export const PropertyIcon: React.FC<
  Omit<IconProps, 'icon'> & {
    metadata: Metadata
    name: string
  }
> = ({ metadata, name, ...props }) => {
  const [icon] = usePropertyIcon(metadata, name)
  if (!icon) return null
  return <Icon {...props} icon={icon} style={{ paddingRight: '10px' }} />
}
