import { useState, type Key } from 'react'

import { useSearchParams } from 'react-router-dom'

import { Alert, Flex, Table, Typography, type TableProps } from 'antd'

import type { Product } from '@/shared/api/types'
import { SORT_ORDER, type SortOrder } from '@/shared/constants/sortOrder'

import { useProducts } from './hooks/useProducts'
import styles from './ProductsTable.module.scss'
import { columns } from './ui/columns'
import { ProductsToolbar } from './ui/ProductsToolbar'


const PAGE_SIZE = 20

export const ProductsTable = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('q') ?? ''

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<string | undefined>()
  const [order, setOrder] = useState<SortOrder | undefined>()
  // https://react.dev/reference/react/useState#storing-information-from-previous-renders
  const [searchSnapshot, setSearchSnapshot] = useState(search)

  if (search !== searchSnapshot) {
    setSearchSnapshot(search)
    setCurrentPage(1)
  }

  const pageForHook = search !== searchSnapshot ? 1 : currentPage

  const { products, total, loading, error, refetch, activePage, appliedSearch } = useProducts({
    search,
    sortBy,
    order,
    page: pageForHook,
    limit: PAGE_SIZE,
  })

  const handleChange: TableProps<Product>['onChange'] = (pagination, _filters, sorter) => {
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

  if (error) {
    return <Alert type='error' title={error} />
  }

  return (
    <Flex vertical gap={40}>
      <ProductsToolbar
        appliedSearchQuery={appliedSearch}
        onRefresh={refetch}
        refreshLoading={loading}
      />
      <Table<Product>
        columns={columns}
        dataSource={products}
        rowKey='id'
        loading={loading}
        onChange={handleChange}
        styles={{
          pagination: {
            root: { marginTop: 40, width: '100%', justifyContent: 'flex-start' },
          },
        }}
        pagination={{
          current: activePage,
          pageSize: PAGE_SIZE,
          total,
          showSizeChanger: false,
          className: styles.paginationBar,
          showTotal: (all, [from, to]) => (
            <Typography.Text>
              <Typography.Text type='secondary'>Показано </Typography.Text>
              {all === 0 ? '0' : `${String(from)}-${String(to)}`}
              <Typography.Text type='secondary'> из </Typography.Text>
              {all}
            </Typography.Text>
          ),
        }}
        rowSelection={{
          columnWidth: 40,
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
      />
    </Flex>
  )
}
