import type { ReactNode } from 'react'

import { useMatches, type UIMatch } from 'react-router-dom'

export interface RouteHandle {
  title?: ReactNode
  search?: boolean
}

export function useRouteHandle(): Partial<RouteHandle> {
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[]

  const match = [...matches].reverse().find((m) => typeof m.handle === 'object')

  return (match?.handle as Partial<RouteHandle> | undefined) ?? {}
}
