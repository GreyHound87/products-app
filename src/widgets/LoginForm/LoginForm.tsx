import { Card, Flex, Form } from 'antd'

import styles from './LoginForm.module.scss'
import LoginFormActions from './ui/LoginFormActions/LoginFormActions'
import LoginFormFields from './ui/LoginFormFields/LoginFormFields'
import LoginFormHeader from './ui/LoginFormHeader/LoginFormHeader'

const LoginForm = () => {
  const [form] = Form.useForm()

  return (
    <Flex className={styles.wrapper}>
      <Card className={styles.card} classNames={{ body: styles.cardBody }}>
        <LoginFormHeader />
        <Form form={form} layout='vertical' requiredMark={false} size='large'>
          <LoginFormFields />
          <LoginFormActions />
        </Form>
      </Card>
    </Flex>
  )
}

export default LoginForm
