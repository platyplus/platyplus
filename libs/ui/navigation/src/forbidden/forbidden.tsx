import { FunctionComponent } from 'react'

export const Forbidden: FunctionComponent = (props) => {
  // usePageTitle('Unauthorised')
  return (
    <div>todo 403</div>
    // <Result
    //   status="403"
    //   title="Hello World"
    //   subTitle="Sorry, you are not authorized to access this page."
    //   extra={<Button type="primary">Back Home</Button>}
    // />
  )
}

export default Forbidden
