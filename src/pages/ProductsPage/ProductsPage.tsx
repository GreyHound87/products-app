import { Button, Result } from 'antd'

import { ErrorBoundary } from '@/shared/ui/ErrorBoundary'
import { ProductsTable } from '@/widgets/ProductsTable'

const ProductsPage = () => {
  return (
    <ErrorBoundary
      renderFallback={({ error, reset }) => (
        <Result
          status='error'
          title='Ошибка таблицы'
          subTitle={error.message}
          extra={
            <Button type='primary' onClick={reset}>
              Попробовать снова
            </Button>
          }
        />
      )}
    >
      <ProductsTable />
    </ErrorBoundary>
  )
}

export default ProductsPage
