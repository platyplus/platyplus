import { FunctionComponent } from 'react'
import { Button, Result } from 'antd'
import { usePageTitle } from '@platyplus/layout'

export const Forbidden: FunctionComponent = (props) => {
  // usePageTitle('Unauthorised')
  return (
    <Result
      status="403"
      title="Hello World"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary">Back Home</Button>}
    />
  )
}

export default Forbidden
