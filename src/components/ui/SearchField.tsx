import type { RefObject } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface SearchFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  inputRef?: RefObject<HTMLInputElement | null>
  shortcut?: string
  className?: string
}

export function SearchField({
  value,
  onChange,
  placeholder = 'Search examples...',
  inputRef,
  shortcut,
  className,
}: SearchFieldProps) {
  return (
    <div className={cn('relative', className)}>
      <Search
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500"
      />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-white/8 bg-ink-900/80 pl-9 pr-16 text-sm text-ink-100 outline-none transition-colors placeholder:text-ink-500 hover:border-white/15 focus:border-accent/35 focus:bg-ink-900"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-md text-ink-400 transition-colors hover:bg-white/5 hover:text-ink-100"
          aria-label="Clear search"
        >
          <X size={13} />
        </button>
      ) : (
        shortcut && (
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md border border-white/8 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-ink-500">
            {shortcut}
          </span>
        )
      )}
    </div>
  )
}
