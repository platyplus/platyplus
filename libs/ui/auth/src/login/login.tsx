import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ButtonToolbar,
  Schema,
  FlexboxGrid,
  Panel,
  Alert
} from 'rsuite'
import { useHistory } from 'react-router-dom'
import { FunctionComponent, useState } from 'react'
import { useHbp } from '@platyplus/hbp'

const { StringType } = Schema.Types
const model = Schema.Model({
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.'),
  password: StringType().isRequired('This field is required.')
})

const errors = {
  '400': 'unknown user',
  '401': 'wrong password'
}

export const Login: FunctionComponent<{ redirect?: string }> = ({
  redirect = '/'
}) => {
  const router = useHistory()
  const [formValue, setFormValue] = useState({ email: '', password: '' })
  const { auth } = useHbp()

  const login = async (check: boolean) => {
    if (check) {
      await model.checkAsync(formValue)
      try {
        await auth.login(formValue)
        router.push(redirect)
      } catch (error) {
        const rawMessage: string = error.message
        const type = rawMessage.substr(rawMessage.length - 3)
        const message = errors[type] || rawMessage
        Alert.error(`Login failed: ${message}`, 5000)
      }
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
                {/* <Button appearance="link">Forgot password?</Button> */}
              </ButtonToolbar>
            </FormGroup>
          </Form>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}
export default Login
