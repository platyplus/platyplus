import React from 'react'
import { useHistory } from 'react-router-dom'
import { Animation, List } from 'rsuite'

import { useMetadataCollection } from '@platyplus/react-rxdb-hasura'
import { HeaderTitleWrapper } from '@platyplus/layout'
import { metadataName } from '@platyplus/rxdb-hasura'

export const ConfigListPage: React.FC<{ role?: string }> = ({
  role = 'user'
}) => {
  const { isFetching, result } = useMetadataCollection(role)
  const title = 'Configuration'
  const history = useHistory()
  return (
    <HeaderTitleWrapper
      title={title}
      //   component={<div>Config</div>}
    >
      <Animation.Fade in={!isFetching}>
        {(props, ref) => (
          <div {...props}>
            {/* <CollectionToolbar collection={collection} /> */}
            <List hover bordered>
              {result.map((item, index) => (
                <List.Item
                  key={index}
                  index={index}
                  style={{
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    history.push(`/config/${item.id}`)
                  }}
                >
                  {metadataName(item)}
                </List.Item>
              ))}
            </List>
          </div>
        )}
      </Animation.Fade>
    </HeaderTitleWrapper>
  )
}
