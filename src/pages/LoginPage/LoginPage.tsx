import { Button, Flex, Result } from 'antd'

import { ErrorBoundary } from '@/shared/ui/ErrorBoundary'
import { LoginForm } from '@/widgets/LoginForm'

import styles from './LoginPage.module.scss'

const LoginPage = () => (
  <Flex justify='center' align='center' className={styles.page}>
    <ErrorBoundary
      renderFallback={({ error, reset }) => (
        <Result
          status='error'
          title='Ошибка формы входа'
          subTitle={error.message}
          extra={
            <Button type='primary' onClick={reset}>
              Попробовать снова
            </Button>
          }
        />
      )}
    >
      <LoginForm />
    </ErrorBoundary>
  </Flex>
)

export default LoginPage
