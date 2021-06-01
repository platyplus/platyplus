import { useHistory } from 'react-router-dom'
import { useHbp } from '@platyplus/hbp'
import { useState } from 'react'
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  FlexboxGrid,
  Form,
  FormControl,
  FormGroup,
  Panel,
  Schema
} from 'rsuite'
export interface RegisterProps {
  redirect?: string
}

const { StringType } = Schema.Types
const model = Schema.Model({
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.'),
  password: StringType().isRequired('This field is required.'),
  passwordCheck: StringType()
    .isRequired('This field is required.')
    .addRule(
      (value, data) => value === data.password,
      'You must enter the same password.'
    )
})

export const Register = ({ redirect = '/' }: RegisterProps) => {
  const router = useHistory()
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
    passwordCheck: ''
  })
  const { auth } = useHbp()
  const register = async (check: boolean) => {
    if (check) {
      try {
        const { email, password } = formValue
        await auth.register({ email, password })
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
        <Panel header={<h3>Register</h3>} bordered>
          <Form
            model={model}
            fluid
            onSubmit={register}
            formValue={formValue}
            onChange={(v: typeof formValue) => setFormValue(v)}
            onCheck={(formError) => {
              console.log('error', formError)
            }}
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
              <ControlLabel>Type password again</ControlLabel>
              <FormControl name="passwordCheck" type="password" />
            </FormGroup>
            <FormGroup>
              <ButtonToolbar>
                <Button appearance="primary" type="submit">
                  Register
                </Button>
              </ButtonToolbar>
            </FormGroup>
          </Form>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}

export default Register
