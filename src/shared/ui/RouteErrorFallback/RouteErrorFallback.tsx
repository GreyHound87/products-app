import { useNavigate, useRouteError } from 'react-router-dom'

import { Button, Result, Space } from 'antd'

export interface RouteErrorFallbackProps {
  title?: string
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'Неизвестная ошибка'
}

export function RouteErrorFallback({ title = 'Ошибка' }: RouteErrorFallbackProps) {
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <Result
      status='error'
      title={title}
      subTitle={getErrorMessage(error)}
      extra={
        <Space wrap>
          <Button
            onClick={() => {
              window.location.reload()
            }}
          >
            Обновить страницу
          </Button>
          <Button type='primary' onClick={() => void navigate('/', { replace: false })}>
            На главную
          </Button>
        </Space>
      }
    />
  )
}
