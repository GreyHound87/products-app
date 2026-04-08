import type { TableProps } from 'antd'

import type { Product } from '@/shared/api/types'
import { SORT_ORDER, type SortOrder } from '@/shared/constants/sortOrder'

export interface GetProductsTableOnChangeParams {
  activePage: number
  setCurrentPage: (page: number) => void
  sortBy: string | undefined
  order: SortOrder | undefined
  setSortBy: (field: string | undefined) => void
  setOrder: (order: SortOrder | undefined) => void
}

export function getProductsTableOnChange({
  activePage,
  setCurrentPage,
  sortBy,
  order,
  setSortBy,
  setOrder,
}: GetProductsTableOnChangeParams): TableProps<Product>['onChange'] {
  return (pagination, _filters, sorter) => {
    if (pagination.current != null && pagination.current !== activePage) {
      setCurrentPage(pagination.current)
    }

    const s = Array.isArray(sorter) ? sorter[0] : sorter
    const dir =
      s.order === 'ascend' ? SORT_ORDER.ASC : s.order === 'descend' ? SORT_ORDER.DESC : undefined
    const nextSortBy = dir ? (s.field as string) : undefined
    const nextOrder = dir

    if (nextSortBy !== sortBy || nextOrder !== order) {
      setSortBy(nextSortBy)
      setOrder(nextOrder)
      setCurrentPage(1)
    }
  }
}
