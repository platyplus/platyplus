import React, { useMemo } from 'react'
import { Animation, List } from 'rsuite'

import { HeaderTitleWrapper } from '@platyplus/layout'
import { ConfigListItem } from './item'
import { isManyToManyJoinTable } from '@platyplus/rxdb-hasura'
import { useTablesConfig } from '@platyplus/react-rxdb-hasura'

export const ConfigTablesPage: React.FC = () => {
  const tables = useTablesConfig()
  const list = useMemo(() => {
    const result = tables.filter((table) => !isManyToManyJoinTable(table))
    return result
  }, [tables])

  const title = 'Tables configuration'

  return (
    <HeaderTitleWrapper title={title}>
      <Animation.Fade in={true}>
        {(props) => (
          <div {...props}>
            {
              <List hover bordered>
                {list.map((tableinfo, index) => (
                  <ConfigListItem
                    key={tableinfo.id}
                    index={index}
                    tableinfo={tableinfo}
                  />
                ))}
              </List>
            }
          </div>
        )}
      </Animation.Fade>
    </HeaderTitleWrapper>
  )
}
