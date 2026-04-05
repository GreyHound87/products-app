import { Button, Divider, Flex, Form, Typography } from 'antd'

import styles from './LoginFormActions.module.scss'

interface LoginFormActionsProps {
  loading?: boolean
}

const LoginFormActions = ({ loading }: LoginFormActionsProps) => (
  <div className={styles.actions}>
    <Form.Item>
      <Button type='primary' htmlType='submit' block loading={loading}>
        Войти
      </Button>
    </Form.Item>

    <Divider plain>
      <Typography.Text type='secondary' className={styles.dividerText}>
        или
      </Typography.Text>
    </Divider>

    <Flex justify='center'>
      <Typography.Text className={styles.accountText}>
        Нет аккаунта? <Typography.Link className={styles.createLink}>Создать</Typography.Link>
      </Typography.Text>
    </Flex>
  </div>
)

export default LoginFormActions
