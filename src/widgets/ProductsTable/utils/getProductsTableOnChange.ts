import type { SetURLSearchParams } from 'react-router-dom'

import type { TableProps } from 'antd'

import type { Product } from '@/shared/api/types'
import { SORT_ORDER, type SortOrder } from '@/shared/constants/sortOrder'

export interface GetProductsTableOnChangeParams {
  activePage: number
  sortBy: string | undefined
  order: SortOrder | undefined
  setSearchParams: SetURLSearchParams
}

export function getProductsTableOnChange({
  activePage,
  sortBy,
  order,
  setSearchParams,
}: GetProductsTableOnChangeParams): TableProps<Product>['onChange'] {
  return (pagination, _filters, sorter) => {
    const s = Array.isArray(sorter) ? sorter[0] : sorter
    const dir =
      s.order === 'ascend' ? SORT_ORDER.ASC : s.order === 'descend' ? SORT_ORDER.DESC : undefined
    const nextSortBy = dir ? (s.field as string) : undefined
    const nextOrder = dir

    const sortChanged = nextSortBy !== sortBy || nextOrder !== order

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)

        if (sortChanged) {
          if (nextSortBy && nextOrder) {
            next.set('sortBy', nextSortBy)
            next.set('order', nextOrder)
          } else {
            next.delete('sortBy')
            next.delete('order')
          }
          next.delete('page')
        } else if (pagination.current != null && pagination.current !== activePage) {
          if (pagination.current <= 1) next.delete('page')
          else next.set('page', String(pagination.current))
        }

        return next
      },
      { replace: true },
    )
  }
}
