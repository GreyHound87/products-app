import { Button, Result, Space } from 'antd'

import type { ErrorBoundaryRenderFallbackArgs } from './ErrorBoundary'

export function AppShellErrorFallback({ error, reset }: ErrorBoundaryRenderFallbackArgs) {
  return (
    <Result
      status='error'
      title='Ошибка приложения'
      subTitle={error.message}
      extra={
        <Space wrap>
          <Button type='primary' onClick={reset}>
            Повторить
          </Button>
          <Button
            onClick={() => {
              window.location.reload()
            }}
          >
            Обновить страницу
          </Button>
        </Space>
      }
    />
  )
}
