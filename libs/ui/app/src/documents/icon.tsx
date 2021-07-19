import { Icon, IconProps } from 'rsuite'

import { usePropertyIcon } from '@platyplus/react-rxdb-hasura'
import { Contents } from '@platyplus/rxdb-hasura'
import { RxCollection } from 'rxdb'

export const PropertyIcon: React.FC<
  Omit<IconProps, 'icon'> & {
    collection: RxCollection<Contents>
    property: string
  }
> = ({ collection, property, ...props }) => {
  const [icon] = usePropertyIcon(collection, property)
  return icon ? <Icon {...props} icon={icon} /> : null
}
