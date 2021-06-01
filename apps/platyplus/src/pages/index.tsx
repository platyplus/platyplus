import styles from './index.module.less'
import { usePageTitle } from '@platyplus/layout'
import { useAuth } from '@nhost/react-auth'
import { Loading } from '@platyplus/navigation'
import { Link, useHistory } from 'react-router-dom'

export const IndexPage: React.FC = () => {
  usePageTitle('Index page')
  const { signedIn } = useAuth()
  const router = useHistory()
  if (signedIn) {
    router.replace('/home')
    return <Loading />
  } else
    return (
      <div className={styles.page}>
        <h2>Welcome, stranger</h2>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/register">Register</Link>
      </div>
    )
}

export default IndexPage
