import { Icon, IconProps } from 'rsuite'

import { usePropertyIcon } from '@platyplus/react-rxdb-hasura'
import { ContentsCollection } from '@platyplus/rxdb-hasura'

export const PropertyIcon: React.FC<
  Omit<IconProps, 'icon'> & {
    collection: ContentsCollection
    property: string
  }
> = ({ collection, property, ...props }) => {
  const [icon] = usePropertyIcon(collection, property)
  return icon ? <Icon {...props} icon={icon} /> : null
}
