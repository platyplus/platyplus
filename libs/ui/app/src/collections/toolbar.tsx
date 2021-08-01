import { useHistory } from 'react-router-dom'
import { Animation, ButtonGroup } from 'rsuite'

import { Metadata } from '@platyplus/rxdb-hasura'
import { useCollectionPermissions } from '@platyplus/react-rxdb-hasura'
import { IconButtonWithHelper } from '@platyplus/layout'

export const CollectionToolbar: React.FC<{
  metadata?: Metadata
  role: string
  edit?: boolean
}> = ({ metadata, role }) => {
  const history = useHistory()
  const create = () => {
    history.push(`/collection/${role}/${metadata.id}/new`)
  }
  const can = useCollectionPermissions(metadata, role)

  return (
    <Animation.Fade in={!!metadata}>
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
