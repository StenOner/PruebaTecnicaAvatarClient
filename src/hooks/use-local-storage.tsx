'use client'

import { useEffect, useState } from 'react'

function useLocalStorage<T>(key: string, initialValue?: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>((localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : initialValue) as T)

  useEffect(() => {
    const stored = localStorage.getItem(key)
    if (stored) setValue(JSON.parse(stored))
  }, [key])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage