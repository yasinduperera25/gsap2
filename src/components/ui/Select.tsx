import type { SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Array<{ value: string; label: string }>
}

export function Select({
  label,
  options,
  className,
  value,
  onChange,
  ...props
}: SelectProps) {
  return (
    <label className="block">
      {label && (
        <span className="mb-2.5 block text-xs font-medium text-ink-300">{label}</span>
      )}
      <div className="relative">
        <select
          className={cn(
            'h-10 w-full appearance-none rounded-xl border border-white/10 bg-ink-900/80 px-3 pr-9 text-sm text-ink-100 outline-none transition-colors hover:border-white/20 focus:border-accent/40',
            className,
          )}
          value={value}
          onChange={onChange}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-ink-900">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400"
        />
      </div>
    </label>
  )
}
