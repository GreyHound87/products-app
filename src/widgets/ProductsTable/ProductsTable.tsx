import { useState, type Key } from 'react'

import { useSearchParams } from 'react-router-dom'

import { Alert, Flex, Table } from 'antd'

import type { Product } from '@/shared/api/types'
import type { SortOrder } from '@/shared/constants/sortOrder'

import { useProducts } from './hooks/useProducts'
import styles from './ProductsTable.module.scss'
import { AddProductModal } from './ui/AddProductModal'
import { columns } from './ui/columns'
import { ProductsPaginationTotal } from './ui/ProductsPaginationTotal'
import { ProductsToolbar } from './ui/ProductsToolbar'
import { getProductsTableOnChange } from './utils/getProductsTableOnChange'

const PAGE_SIZE = 20

export const ProductsTable = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('q') ?? ''

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [addModalOpen, setAddModalOpen] = useState(false)
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

  const handleChange = getProductsTableOnChange({
    activePage,
    setCurrentPage,
    sortBy,
    order,
    setSortBy,
    setOrder,
  })

  if (error) {
    return <Alert type='error' title={error} />
  }

  const pagination = {
    current: activePage,
    pageSize: PAGE_SIZE,
    total,
    showSizeChanger: false,
    className: styles.paginationBar,
    showTotal(allCount: number, pageRange: [number, number]) {
      return <ProductsPaginationTotal total={allCount} range={pageRange} />
    },
  }

  return (
    <Flex vertical gap={40}>
      <ProductsToolbar
        appliedSearchQuery={appliedSearch}
        onRefresh={refetch}
        refreshLoading={loading}
        onAdd={() => {
          setAddModalOpen(true)
        }}
      />
      <AddProductModal
        open={addModalOpen}
        onClose={() => {
          setAddModalOpen(false)
        }}
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
        pagination={pagination}
        rowSelection={{
          columnWidth: 40,
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
      />
    </Flex>
  )
}
