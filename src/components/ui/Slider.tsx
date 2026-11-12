import type { CSSProperties } from 'react'
import { cn } from '@/utils/cn'

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  onChange: (value: number) => void
  className?: string
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = '',
  onChange,
  className,
}: SliderProps) {
  const progress = ((value - min) / (max - min)) * 100

  return (
    <label className={cn('block', className)}>
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-ink-300">{label}</span>
        <span className="rounded-md border border-white/5 bg-ink-900/80 px-2 py-0.5 font-mono text-[11px] text-accent">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        className="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ '--range-progress': `${progress}%` } as CSSProperties}
      />
    </label>
  )
}
