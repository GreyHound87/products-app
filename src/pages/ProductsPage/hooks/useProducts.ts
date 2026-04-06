import { useState, useEffect } from 'react'

import { getProducts } from '@/shared/api/products'
import type { Product } from '@/shared/api/types'
import { useDebounce } from '@/shared/hooks/useDebounce'

export interface UseProductsParams {
  search?: string
  sortBy?: string
  order?: 'asc' | 'desc'
}

export interface UseProductsResult {
  products: Product[]
  total: number
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useProducts({
  search = '',
  sortBy,
  order,
}: UseProductsParams = {}): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [epoch, setEpoch] = useState(0)

  const debouncedSearch = useDebounce(search, 400)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getProducts(
          { search: debouncedSearch, sortBy, order },
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
  }, [debouncedSearch, sortBy, order, epoch])

  const refetch = () => {
    setEpoch((e) => e + 1)
  }

  return { products, total, loading, error, refetch }
}
