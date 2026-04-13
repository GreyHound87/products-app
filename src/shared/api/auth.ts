import { apiFetch } from './client'

import type { AuthResponse } from './types'

const AUTH_FLAG_KEY = 'authenticated'
const AUTH_FLAG_VALUE = 'authenticated'

export async function loginApi(username: string, password: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
}

/** Запомнить: храним только флаг. */
export function saveAuthFlag(remember: boolean): void {
  if (remember) {
    localStorage.setItem(AUTH_FLAG_KEY, AUTH_FLAG_VALUE)
    sessionStorage.removeItem(AUTH_FLAG_KEY)
  } else {
    sessionStorage.setItem(AUTH_FLAG_KEY, AUTH_FLAG_VALUE)
    localStorage.removeItem(AUTH_FLAG_KEY)
  }
}

export function hasAuthFlag(): boolean {
  return (
    localStorage.getItem(AUTH_FLAG_KEY) === AUTH_FLAG_VALUE ||
    sessionStorage.getItem(AUTH_FLAG_KEY) === AUTH_FLAG_VALUE
  )
}
