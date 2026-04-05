import { apiFetch } from './client'

import type { AuthResponse } from './types'

export async function loginApi(username: string, password: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
}

export function saveToken(token: string, remember: boolean): void {
  const storage = remember ? localStorage : sessionStorage
  storage.setItem('auth_token', token)
}
