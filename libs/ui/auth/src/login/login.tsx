import { useRouter } from 'next/router'
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ButtonToolbar,
  Schema,
  FlexboxGrid,
  Panel
} from 'rsuite'

import { FunctionComponent, useState } from 'react'
import { useHbp } from '@platyplus/hbp'

const { StringType } = Schema.Types
const model = Schema.Model({
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.'),
  password: StringType().isRequired('This field is required.')
})

export const Login: FunctionComponent<{ redirect?: string }> = ({
  redirect = '/'
}) => {
  const router = useRouter()
  const [formValue, setFormValue] = useState({ email: '', password: '' })
  const { auth } = useHbp()
  const login = async (check: boolean) => {
    if (check) {
      await model.checkAsync(formValue)
      try {
        await auth.login(formValue)
      } catch (error) {
        console.log(error)
        return alert('login failed')
      }
      router.push(redirect)
    }
  }

  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={12}>
        <Panel header={<h3>Login</h3>} bordered>
          <Form
            model={model}
            fluid
            onSubmit={login}
            formValue={formValue}
            onChange={(v: typeof formValue) => setFormValue(v)}
          >
            <FormGroup>
              <ControlLabel>Email address</ControlLabel>
              <FormControl name="email" />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl name="password" type="password" />
            </FormGroup>
            <FormGroup>
              <ButtonToolbar>
                <Button appearance="primary" type="submit">
                  Sign in
                </Button>
                <Button appearance="link">Forgot password?</Button>
              </ButtonToolbar>
            </FormGroup>
          </Form>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}
export default Login
