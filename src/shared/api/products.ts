import { apiFetch } from './client'

import type { ProductsResponse } from './types'

export interface GetProductsParams {
  limit?: number
  skip?: number
  sortBy?: string
  order?: 'asc' | 'desc'
  search?: string
}

export async function getProducts(
  params: GetProductsParams = {},
  signal?: AbortSignal,
): Promise<ProductsResponse> {
  const isSearch = Boolean(params.search)
  const basePath = isSearch ? '/products/search' : '/products'

  const query = new URLSearchParams()
  if (params.search) query.set('q', params.search)
  if (params.limit) query.set('limit', String(params.limit))
  if (params.skip) query.set('skip', String(params.skip))
  if (!isSearch && params.sortBy) query.set('sortBy', params.sortBy)
  if (!isSearch && params.order) query.set('order', params.order)

  const qs = query.toString()
  return apiFetch<ProductsResponse>(
    qs ? `${basePath}?${qs}` : basePath,
    signal ? { signal } : undefined,
  )
}
