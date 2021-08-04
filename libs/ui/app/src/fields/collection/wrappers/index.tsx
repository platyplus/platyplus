import { isManyToManyJoinTable } from '@platyplus/rxdb-hasura'
import { useMetadata } from '@platyplus/react-rxdb-hasura'

import { CollectionFieldComponent } from '../types'
import { DirectCollectionField } from './direct'
import { ManyToManyCollectionField } from './many-to-many'

export const CollectionField: CollectionFieldComponent = (props) => {
  const refMetadata = useMetadata(props.property.relationship.remoteTableId)
  const isManyToMany = isManyToManyJoinTable(refMetadata)
  if (isManyToMany) return <ManyToManyCollectionField {...props} />
  else return <DirectCollectionField {...props} />
}
