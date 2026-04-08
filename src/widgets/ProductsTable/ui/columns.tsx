import { Typography, type TableProps } from 'antd'

import type { Product } from '@/shared/api/types'

import { ActionsCell } from './ActionsCell/ActionsCell'
import { NameCell } from './NameCell/NameCell'
import { PriceCell } from './PriceCell/PriceCell'
import { RatingCell } from './RatingCell/RatingCell'

export const columns: TableProps<Product>['columns'] = [
  {
    title: 'Наименование',
    dataIndex: 'title',
    key: 'title',
    sorter: true,
    render: (title: string, record: Product) => (
      <NameCell title={title} category={record.category} thumbnail={record.thumbnail} />
    ),
  },
  {
    title: 'Вендор',
    dataIndex: 'brand',
    key: 'brand',
    align: 'center',
    sorter: true,
    render: (brand: string) => <Typography.Text strong>{brand}</Typography.Text>,
  },
  {
    title: 'Артикул',
    dataIndex: 'sku',
    key: 'sku',
    align: 'center',
  },
  {
    title: 'Оценка',
    dataIndex: 'rating',
    key: 'rating',
    align: 'center',
    sorter: true,
    render: (rating: number) => <RatingCell rating={rating} />,
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
    sorter: true,
    render: (price: number) => <PriceCell price={price} />,
  },
  {
    key: 'actions',
    width: 180,
    align: 'center',
    render: () => <ActionsCell />,
  },
]
