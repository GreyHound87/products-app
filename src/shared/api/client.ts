const BASE_URL = 'https://dummyjson.com'

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    cache: 'no-store',
    ...init,
  })
  if (!res.ok) throw await res.json()
  return (await res.json()) as T
}
