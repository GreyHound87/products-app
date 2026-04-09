import { Typography, type TableProps } from 'antd'

import type { Product } from '@/shared/api/types'
import type { SortOrder } from '@/shared/constants/sortOrder'

import { sortOrderToAntd } from '../utils/sortOrderToAntd'
import { ActionsCell } from './ActionsCell/ActionsCell'
import { NameCell } from './NameCell/NameCell'
import { PriceCell } from './PriceCell/PriceCell'
import { RatingCell } from './RatingCell/RatingCell'

export interface GetProductsTableColumnsParams {
  sortBy: string | undefined
  order: SortOrder | undefined
}

export function getProductsTableColumns({
  sortBy,
  order,
}: GetProductsTableColumnsParams): TableProps<Product>['columns'] {
  const activeOrder = sortOrderToAntd(order)

  return [
    {
      title: 'Наименование',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      sortOrder: sortBy === 'title' ? activeOrder : undefined,
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
      sortOrder: sortBy === 'brand' ? activeOrder : undefined,
      render: (brand: string) => <Typography.Text strong>{brand}</Typography.Text>,
    },
    {
      title: 'Артикул',
      dataIndex: 'sku',
      key: 'sku',
      align: 'center',
      sorter: true,
      sortOrder: sortBy === 'sku' ? activeOrder : undefined,
    },
    {
      title: 'Оценка',
      dataIndex: 'rating',
      key: 'rating',
      align: 'center',
      sorter: true,
      sortOrder: sortBy === 'rating' ? activeOrder : undefined,
      render: (rating: number) => <RatingCell rating={rating} />,
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      sorter: true,
      sortOrder: sortBy === 'price' ? activeOrder : undefined,
      render: (price: number) => <PriceCell price={price} />,
    },
    {
      key: 'actions',
      width: 180,
      align: 'center',
      render: () => <ActionsCell />,
    },
  ]
}
