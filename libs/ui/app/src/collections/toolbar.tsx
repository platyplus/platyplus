import { useHistory } from 'react-router-dom'
import { Animation, ButtonGroup } from 'rsuite'

import { ContentsCollection } from '@platyplus/rxdb-hasura'
import { useCollectionPermissions } from '@platyplus/react-rxdb-hasura'
import { IconButtonWithHelper } from '@platyplus/layout'

export const CollectionToolbar: React.FC<{
  collection?: ContentsCollection
  edit?: boolean
}> = ({ collection }) => {
  const history = useHistory()
  const create = () => {
    history.push(`/collection/${collection.name}/new`)
  }
  const can = useCollectionPermissions(collection)

  return (
    <Animation.Fade in={!!collection}>
      {(props, ref) => (
        <div {...props}>
          <ButtonGroup style={{ paddingBottom: '10px' }}>
            {can.create && (
              <IconButtonWithHelper
                icon="plus"
                helper="Create"
                onClick={create}
                size="sm"
              >
                New
              </IconButtonWithHelper>
            )}
          </ButtonGroup>
        </div>
      )}
    </Animation.Fade>
  )
}
