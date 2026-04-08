import { SORT_ORDER, type SortOrder } from '@/shared/constants/sortOrder'

export function sortOrderToAntd(order: SortOrder | undefined): 'ascend' | 'descend' | undefined {
  if (order === SORT_ORDER.ASC) return 'ascend'
  if (order === SORT_ORDER.DESC) return 'descend'
  return undefined
}
