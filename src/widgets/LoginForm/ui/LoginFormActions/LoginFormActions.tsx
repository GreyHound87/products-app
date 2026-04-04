import { Button, Divider, Flex, Form, Typography } from 'antd'

const LoginFormActions = () => (
  <>
    <Form.Item>
      <Button type='primary' htmlType='submit' block>
        Войти
      </Button>
    </Form.Item>

    <Divider plain>
      <Typography.Text type='secondary' style={{ fontSize: 16, fontWeight: 500 }}>
        или
      </Typography.Text>
    </Divider>

    <Flex justify='center'>
      <Typography.Text style={{ fontSize: 18, fontWeight: 400 }}>
        Нет аккаунта?{' '}
        <Typography.Link style={{ fontSize: 18, fontWeight: 600, textDecoration: 'underline' }}>
          Создать
        </Typography.Link>
      </Typography.Text>
    </Flex>
  </>
)

export default LoginFormActions
