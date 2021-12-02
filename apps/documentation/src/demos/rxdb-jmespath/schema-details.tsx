import React from 'react'
import Details from '@theme/Details'

import CodeBlock from '@theme/CodeBlock'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import type { Database } from './types'

export const SchemaDetails: React.FC<{ db: Database }> = ({ db }) => (
  <Details
    summary={
      <>
        <summary>Schema definition</summary>
        <Tabs className="unique-tabs">
          <TabItem value="album" label="User" default>
            <CodeBlock className="language-json">
              {JSON.stringify(db.collections.users.schema.jsonSchema, null, 2)}
            </CodeBlock>
          </TabItem>
          <TabItem value="post" label="Post" default>
            <CodeBlock className="language-json">
              {JSON.stringify(db.collections.posts.schema.jsonSchema, null, 2)}
            </CodeBlock>
          </TabItem>
          <TabItem value="comment" label="Comment" default>
            <CodeBlock className="language-json">
              {JSON.stringify(
                db.collections.comments.schema.jsonSchema,
                null,
                2
              )}
            </CodeBlock>
          </TabItem>
        </Tabs>
      </>
    }
  />
)
