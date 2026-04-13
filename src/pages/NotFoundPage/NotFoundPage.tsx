import { useNavigate } from 'react-router-dom'

import { Button, Flex, Result } from 'antd'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <Flex justify='center' align='center' style={{ minHeight: '100vh' }}>
      <Result
        status='404'
        title='404'
        subTitle='Страница не найдена'
        extra={
          <Button type='primary' onClick={() => void navigate('/', { replace: true })}>
            На главную
          </Button>
        }
      />
    </Flex>
  )
}

export default NotFoundPage
