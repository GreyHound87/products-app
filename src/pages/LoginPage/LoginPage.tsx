import { Flex } from 'antd'

import { LoginForm } from '@/widgets/LoginForm'

import styles from './LoginPage.module.scss'

const LoginPage = () => (
  <Flex justify='center' align='center' className={styles.page}>
    <LoginForm />
  </Flex>
)

export default LoginPage
