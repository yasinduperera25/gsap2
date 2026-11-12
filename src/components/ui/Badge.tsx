import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { capitalize } from '@/utils/format'
import type { LevelSlug } from '@/types'

type Tone = LevelSlug | 'neutral' | 'accent' | 'muted'

const tones: Record<Tone, string> = {
  beginner: 'border-accent/25 bg-accent/10 text-accent',
  intermediate: 'border-cyan/25 bg-cyan/10 text-cyan',
  advanced: 'border-violet/25 bg-violet/10 text-violet',
  neutral: 'border-white/10 bg-white/[0.04] text-ink-300',
  accent: 'border-accent/30 bg-accent/10 text-accent',
  muted: 'border-white/5 bg-white/[0.03] text-ink-400',
}

interface BadgeProps {
  children: ReactNode
  tone?: Tone
  className?: string
  dot?: boolean
}

export function Badge({ children, tone = 'neutral', className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]',
        tones[tone],
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}

export function LevelBadge({ level }: { level: LevelSlug }) {
  return <Badge tone={level}>{capitalize(level)}</Badge>
}
