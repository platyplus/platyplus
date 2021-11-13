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

import { HeaderTitleWrapper, IconPicker, RichText } from '@platyplus/layout'
import { usePage } from '@platyplus/react-rxdb-hasura'
import { pageTitle } from './utils'
import { PrivateRoute } from '@platyplus/auth'

const Page: React.FC<{ role?: string }> = React.forwardRef(() => {
  const { id } = useParams()
  const { page, setPage, isFetching } = usePage({ id })
  return (
    <Animation.Fade in={!!page}>
      {(props) => (
        <div {...props}>
          {!isFetching && (
            <HeaderTitleWrapper title={`Page: ${pageTitle(page)}`} previous>
              <Form formValue={page} onChange={setPage}>
                <FormGroup>
                  <ControlLabel>Slug</ControlLabel>
                  <FormControl name="slug" accepter={Input} defaultValue="" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Title</ControlLabel>
                  <FormControl name="title" accepter={Input} defaultValue="" />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Icon</ControlLabel>
                  <FormControl
                    name="icon"
                    accepter={IconPicker}
                    defaultValue=""
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Contents</ControlLabel>
                  <FormControl name="contents" accepter={RichText} />
                </FormGroup>
              </Form>
            </HeaderTitleWrapper>
          )}
        </div>
      )}
    </Animation.Fade>
  )
})
export const ConfigPagePage = () => (
  <PrivateRoute>
    <Page />
  </PrivateRoute>
)
