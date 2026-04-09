import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { ConfigProvider } from 'antd'

import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { Product } from '@/shared/api/types'

import { ProductsTable } from './ProductsTable'

vi.mock('@/shared/hooks/useDebounce', () => ({
  useDebounce: <T,>(value: T) => value,
}))

function makeProduct(
  partial: Partial<Product> & Pick<Product, 'id' | 'title' | 'price' | 'sku'>,
): Product {
  return {
    description: '',
    category: 'cat',
    discountPercentage: 0,
    rating: 4,
    stock: 1,
    tags: [],
    weight: 1,
    dimensions: { width: 1, height: 1, depth: 1 },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: 'In Stock',
    reviews: [],
    returnPolicy: '',
    minimumOrderQuantity: 1,
    meta: { createdAt: 'x', updatedAt: 'x', barcode: 'x', qrCode: 'x' },
    thumbnail: 'https://example.com/t.jpg',
    images: [],
    ...partial,
  }
}

describe('ProductsTable', () => {
  const high = makeProduct({ id: 3, title: 'Row-High-Price', price: 100, sku: 'SKU-H' })
  const low = makeProduct({ id: 1, title: 'Row-Low-Price', price: 10, sku: 'SKU-L' })
  const mid = makeProduct({ id: 2, title: 'Row-Mid-Price', price: 50, sku: 'SKU-M' })

  /** Не по возрастанию цены: проверяем, что UI не пересортировал строки относительно массива из ответа. */
  const productsInResponseOrder = [high, low, mid]

  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => {
        const body = {
          products: productsInResponseOrder,
          total: 3,
          skip: 0,
          limit: 20,
        }
        return Promise.resolve(
          new Response(JSON.stringify(body), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }),
        )
      }),
    )
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('renders tbody row order matching products[] from fetch response', async () => {
    render(
      <ConfigProvider>
        <MemoryRouter initialEntries={['/products?sortBy=price&order=asc']}>
          <Routes>
            <Route path='/products' element={<ProductsTable />} />
          </Routes>
        </MemoryRouter>
      </ConfigProvider>,
    )

    await screen.findByText('Row-High-Price')

    const tbody = document.querySelector('.ant-table-tbody')
    expect(tbody).toBeTruthy()
    const rows = within(tbody as HTMLElement).getAllByRole('row')

    expect(rows[0].textContent).toContain('Row-High-Price')
    expect(rows[1].textContent).toContain('Row-Low-Price')
    expect(rows[2].textContent).toContain('Row-Mid-Price')
  })
})
