'use client'

import { useEffect, useState } from 'react'

let localStorage = typeof window !== 'undefined' ? window.localStorage : undefined

type Key = 'MY_LIST' | 'WATCH_LATER'

function useLocalStorage<T>(key: Key, initialValue?: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>((localStorage?.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : initialValue) as T)

  useEffect(() => {
    const stored = localStorage!.getItem(key)
    if (stored) setValue(JSON.parse(stored))
  }, [key])

  useEffect(() => {
    localStorage!.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage