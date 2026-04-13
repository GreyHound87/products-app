import { useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { Card, Flex, Form } from 'antd'

import { loginApi, saveAuthFlag } from '@/shared/api/auth'

import styles from './LoginForm.module.scss'
import LoginFormActions from './ui/LoginFormActions/LoginFormActions'
import LoginFormFields from './ui/LoginFormFields/LoginFormFields'
import LoginFormHeader from './ui/LoginFormHeader/LoginFormHeader'

interface LoginFormValues {
  username: string
  password: string
  remember: boolean
}

const LoginForm = () => {
  const [form] = Form.useForm<LoginFormValues>()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/products'

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true)
    try {
      await loginApi(values.username, values.password)
      saveAuthFlag(values.remember)
      void navigate(from, { replace: true })
    } catch (error: unknown) {
      const message = (error as { message?: string }).message ?? 'Ошибка авторизации'
      form.setFields([{ name: 'username', errors: [message] }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex className={styles.wrapper}>
      <Card className={styles.card} classNames={{ body: styles.cardBody }}>
        <LoginFormHeader />
        <Form form={form} layout='vertical' requiredMark={false} size='large' onFinish={onFinish}>
          <LoginFormFields />
          <LoginFormActions loading={loading} />
        </Form>
      </Card>
    </Flex>
  )
}

export default LoginForm
