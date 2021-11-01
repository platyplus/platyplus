import React from 'react'
import { Animation, ButtonGroup, ButtonToolbar, List } from 'rsuite'
import { useHistory } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { HeaderTitleWrapper, IconButtonWithHelper } from '@platyplus/layout'
import { usePages } from '@platyplus/react-rxdb-hasura'
import { pageTitle } from './utils'

export const ConfigPagesPage: React.FC = () => {
  const pages = usePages()
  const history = useHistory()

  const title = 'Pages configuration'
  const add = () => {
    history.push(`/config/pages/${uuid()}`)
  }
  return (
    <HeaderTitleWrapper title={title}>
      <Animation.Fade in={!!pages}>
        {(props) => (
          <div {...props}>
            <ButtonToolbar>
              <ButtonGroup>
                <IconButtonWithHelper
                  icon="plus"
                  helper="Add a page"
                  onClick={add}
                />
              </ButtonGroup>
            </ButtonToolbar>
            <List hover bordered>
              {pages.map((page, index) => (
                <List.Item
                  key={page.id}
                  index={index}
                  style={{
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    history.push(`/config/pages/${page.id}`)
                  }}
                >
                  {pageTitle(page)}
                </List.Item>
              ))}
            </List>
          </div>
        )}
      </Animation.Fade>
    </HeaderTitleWrapper>
  )
}
