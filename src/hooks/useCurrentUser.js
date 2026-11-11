import { useMemo } from 'react'

export function useCurrentUser() {
  return useMemo(() => {
    try {
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }, [])
}

export function getCurrentUserEmail() {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw)?.email : null
  } catch {
    return null
  }
}
