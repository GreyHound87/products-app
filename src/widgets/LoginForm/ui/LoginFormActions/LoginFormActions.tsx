import { Button, Divider, Flex, Form, Typography } from 'antd'

import styles from './LoginFormActions.module.scss'

const LoginFormActions = () => (
  <div className={styles.actions}>
    <Form.Item>
      <Button type='primary' htmlType='submit' block>
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
