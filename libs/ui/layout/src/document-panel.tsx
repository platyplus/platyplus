import React from 'react'
import { ButtonToolbar, Panel } from 'rsuite'

export const DocumentPanel: React.FC<{
  title?: React.ReactNode
  toolbar?: React.ReactNode
}> = ({ title, toolbar, children }) => (
  <Panel
    bordered
    header={
      <div>
        {title && (
          <div
            style={{
              position: 'absolute'
            }}
          >
            {title}
          </div>
        )}
        {toolbar && (
          <ButtonToolbar
            style={{
              float: 'right'
            }}
          >
            {toolbar}
          </ButtonToolbar>
        )}
      </div>
    }
  >
    {children}
  </Panel>
)
