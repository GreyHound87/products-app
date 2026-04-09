import { useState, type Key } from 'react'

import { useSearchParams } from 'react-router-dom'

import { Alert, Flex, Table } from 'antd'

import type { Product } from '@/shared/api/types'

import { useProducts } from './hooks/useProducts'
import styles from './ProductsTable.module.scss'
import { AddProductModal } from './ui/AddProductModal'
import { getProductsTableColumns } from './ui/columns'
import { ProductsPaginationTotal } from './ui/ProductsPaginationTotal'
import { ProductsToolbar } from './ui/ProductsToolbar'
import { getProductsTableOnChange } from './utils/getProductsTableOnChange'
import { parseProductsListParams } from './utils/parseProductsListParams'

const PAGE_SIZE = 20

export const ProductsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { q, page, sortBy, order } = parseProductsListParams(searchParams)

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [addModalOpen, setAddModalOpen] = useState(false)

  const columns = getProductsTableColumns({ sortBy, order })

  const { products, total, loading, error, refetch, activePage, appliedSearch } = useProducts({
    search: q,
    sortBy,
    order,
    page,
    limit: PAGE_SIZE,
  })

  const handleChange = getProductsTableOnChange({
    activePage,
    sortBy,
    order,
    setSearchParams,
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
        rootClassName={styles.selectionRailTable}
        columns={columns}
        dataSource={products}
        rowKey='id'
        loading={loading}
        onChange={handleChange}
        classNames={{
          header: {
            cell: styles.headerCellNoDivider,
          },
        }}
        styles={{
          header: {
            cell: {
              backgroundColor: 'var(--ant-color-bg-container)',
              fontSize: 16,
              color: 'var(--ant-color-text-description)',
            },
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
