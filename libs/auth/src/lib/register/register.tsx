import { useRouter } from 'next/router'
import { Form, Input, Button } from 'antd'
import { auth } from '@platyplus/hbp'
import './register.module.less'

const { Item } = Form

/* eslint-disable-next-line */
export interface RegisterProps {
  redirect?: string
}

const layout = {
  // labelCol: { span: 8 },
  // wrapperCol: { span: 16 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

export const Register = ({ redirect = '/' }: RegisterProps) => {
  const router = useRouter()

  const onFinish = async (values) => {
    try {
      await auth.register(values)
    } catch (error) {
      console.log(error)
      return alert('regsiter failed')
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
      initialValues={{}}
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
      <Item
        label="Password again"
        name="passwordBis"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
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
export default Register
