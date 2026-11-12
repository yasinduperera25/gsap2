import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
  action?: ReactNode
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && (
          <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
            <span className="h-px w-6 bg-accent/50" />
            {eyebrow}
          </div>
        )}
        <h2 className="text-3xl font-semibold leading-tight text-ink-50 sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-sm leading-relaxed text-ink-400 sm:text-base">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
