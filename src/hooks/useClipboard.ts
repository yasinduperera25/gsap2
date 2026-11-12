import { useCallback, useEffect, useRef, useState } from 'react'
import { copyText } from '@/utils/clipboard'

export function useClipboard(resetDelay = 1800) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const copy = useCallback(
    async (value: string) => {
      try {
        await copyText(value)
        setCopied(true)
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
        timeoutRef.current = window.setTimeout(() => setCopied(false), resetDelay)
      } catch {
        setCopied(false)
      }
    },
    [resetDelay],
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  return { copied, copy }
}
