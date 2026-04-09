import { Button, Flex, Space, Typography } from 'antd'

import { PlusCircleOutlined, SyncOutlined } from '@ant-design/icons'

export interface ProductsToolbarProps {
  appliedSearchQuery: string
  onRefresh: () => void
  refreshLoading?: boolean
  onAdd?: () => void
}

export const ProductsToolbar = ({
  appliedSearchQuery,
  onRefresh,
  refreshLoading = false,
  onAdd,
}: ProductsToolbarProps) => {
  const trimmed = appliedSearchQuery.trim()
  const subtitle = trimmed.length > 0 ? `Результаты поиска: "${trimmed}"` : 'Все позиции'

  return (
    <Flex justify='space-between' align='center' wrap='wrap' gap={12}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        {subtitle}
      </Typography.Title>
      <Space>
        <Button
          type='default'
          icon={<SyncOutlined />}
          onClick={onRefresh}
          loading={refreshLoading}
          title='Обновить'
          aria-label='Обновить список товаров'
        />
        <Button type='primary' icon={<PlusCircleOutlined />} onClick={onAdd}>
          Добавить
        </Button>
      </Space>
    </Flex>
  )
}
