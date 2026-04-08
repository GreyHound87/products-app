import { SORT_ORDER, type SortOrder } from '@/shared/constants/sortOrder'

export const PRODUCTS_SORTABLE_FIELDS = ['title', 'brand', 'sku', 'rating', 'price'] as const

export type ProductsSortableField = (typeof PRODUCTS_SORTABLE_FIELDS)[number]

const SORTABLE_SET = new Set<string>(PRODUCTS_SORTABLE_FIELDS)

export interface ProductsListQueryState {
  q: string
  page: number
  sortBy: ProductsSortableField | undefined
  order: SortOrder | undefined
}

export function parseProductsListParams(searchParams: URLSearchParams): ProductsListQueryState {
  const q = searchParams.get('q') ?? ''

  const pageRaw = searchParams.get('page')
  let page = 1
  if (pageRaw !== null) {
    const n = Number.parseInt(pageRaw, 10)
    if (Number.isFinite(n) && n >= 1) page = n
  }

  const sortByRaw = searchParams.get('sortBy')
  const sortBy =
    sortByRaw !== null && SORTABLE_SET.has(sortByRaw)
      ? (sortByRaw as ProductsSortableField)
      : undefined

  const orderRaw = searchParams.get('order')
  const order = orderRaw === SORT_ORDER.ASC || orderRaw === SORT_ORDER.DESC ? orderRaw : undefined

  const validPair =
    sortBy !== undefined && order !== undefined
      ? { sortBy, order }
      : { sortBy: undefined, order: undefined }

  return { q, page, sortBy: validPair.sortBy, order: validPair.order }
}
