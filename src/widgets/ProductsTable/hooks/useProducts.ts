import { useState, useEffect } from 'react'

import { getProducts } from '@/shared/api/products'
import type { Product } from '@/shared/api/types'
import type { SortOrder } from '@/shared/constants/sortOrder'
import { useDebounce } from '@/shared/hooks/useDebounce'

export interface UseProductsParams {
  search?: string
  sortBy?: string
  order?: SortOrder
  page?: number
  limit?: number
}

export interface UseProductsResult {
  products: Product[]
  total: number
  loading: boolean
  error: string | null
  refetch: () => void
  activePage: number
  /** То, что ушло в API. */
  appliedSearch: string
}

export function useProducts({
  search = '',
  sortBy,
  order,
  page: requestedPage = 1,
  limit = 20,
}: UseProductsParams = {}): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [epoch, setEpoch] = useState(0)

  const debouncedSearch = useDebounce(search, 400)

  const pageCount = Math.max(1, Math.ceil(total / limit))
  const effectivePage = Math.min(requestedPage, pageCount)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const skip = Math.max(0, (effectivePage - 1) * limit)
        const data = await getProducts(
          { search: debouncedSearch, sortBy, order, limit, skip },
          controller.signal,
        )
        if (!active) return
        setProducts(data.products)
        setTotal(data.total)
      } catch (err: unknown) {
        if (!active) return
        if (err instanceof Error && err.name === 'AbortError') return
        setError((err as { message?: string }).message ?? 'Ошибка загрузки товаров')
      } finally {
        if (active) setLoading(false)
      }
    }

    void run()

    return () => {
      active = false
      controller.abort()
    }
  }, [debouncedSearch, sortBy, order, effectivePage, limit, epoch])

  const refetch = () => {
    setEpoch((e) => e + 1)
  }

  return {
    products,
    total,
    loading,
    error,
    refetch,
    activePage: effectivePage,
    appliedSearch: debouncedSearch,
  }
}
