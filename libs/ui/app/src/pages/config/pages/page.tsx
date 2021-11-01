import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Animation,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Input
} from 'rsuite'
import { HeaderTitleWrapper, IconPicker } from '@platyplus/layout'

import { pageTitle } from './utils'
import { usePageConfig } from '@platyplus/react-rxdb-hasura'

export const ConfigPagePage: React.FC<{ role?: string }> = () => {
  const { id } = useParams<{ id: string }>()
  const [page, setPage] = usePageConfig(id)

  return (
    <Animation.Fade in={!!page}>
      {(props) => (
        <div {...props}>
          {page && (
            <HeaderTitleWrapper title={`Page: ${pageTitle(page)}`} previous>
              <Form formValue={page} onChange={setPage}>
                <FormGroup>
                  <ControlLabel>Slug</ControlLabel>
                  <FormControl name="slug" accepter={Input} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Title</ControlLabel>
                  <FormControl name="title" accepter={Input} />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Icon</ControlLabel>
                  <FormControl name="icon" accepter={IconPicker} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Contents</ControlLabel>
                  <FormControl name="contents" accepter={Input} />
                </FormGroup>
              </Form>
            </HeaderTitleWrapper>
          )}
        </div>
      )}
    </Animation.Fade>
  )
}
