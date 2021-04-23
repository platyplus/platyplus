import { useRouter } from 'next/router'
import { Form, Input, Button, Checkbox } from 'antd'
import { auth } from '@platyplus/hbp'
import './login.module.less'

const { Item } = Form

/* eslint-disable-next-line */
export interface LoginProps {
  redirect?: string
}

const layout = {
  // labelCol: { span: 8 },
  // wrapperCol: { span: 16 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

export const Login = ({ redirect = '/' }: LoginProps) => {
  const router = useRouter()

  const onFinish = async (values) => {
    try {
      await auth.login(values)
    } catch (error) {
      console.log(error)
      return alert('login failed')
    }
    router.push(redirect)
  }

  const onFinishFailed = async () => {
    console.log('failed')
  }

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Item>

      <Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Item>

      <Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Item>

      <Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Item>
      {/* <Item>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </Item> */}
    </Form>
  )
}
export default Login
