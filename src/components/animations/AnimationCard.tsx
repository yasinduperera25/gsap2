import { Link } from 'react-router-dom'
import { ArrowUpRight, Lightbulb } from 'lucide-react'
import { Badge, LevelBadge } from '@/components/ui/Badge'
import { CodeBlock } from '@/components/code/CodeBlock'
import type { AnimationExample } from '@/types'
import { cn } from '@/utils/cn'
import { padIndex } from '@/utils/format'
import { AnimationStage } from './AnimationStage'

interface AnimationCardProps {
  example: AnimationExample
  compact?: boolean
  className?: string
}

export function AnimationCard({ example, compact, className }: AnimationCardProps) {
  return (
    <article
      id={example.id}
      className={cn(
        'card-surface card-surface-hover group scroll-mt-24 overflow-hidden rounded-3xl',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 p-5 pb-4 sm:p-6 sm:pb-5">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <LevelBadge level={example.level} />
            <Badge tone="muted">{example.categories[0]}</Badge>
          </div>
          <h3 className="font-display text-lg font-semibold leading-tight text-ink-50 sm:text-xl">
            <Link
              to={`/examples/${example.id}`}
              className="transition-colors hover:text-accent"
            >
              {example.title}
            </Link>
          </h3>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-ink-400 sm:text-sm">
            {example.summary}
          </p>
        </div>
        <span className="shrink-0 font-mono text-[10px] text-ink-600">
          {padIndex(example.order)}
        </span>
      </div>

      <div className="px-3 sm:px-4">
        <AnimationStage example={example} compact={compact} />
      </div>

      {!compact && (
        <div className="space-y-4 p-5 pt-5 sm:p-6">
          <p className="text-xs leading-relaxed text-ink-300 sm:text-sm">
            {example.explanation}
          </p>

          <div className="flex gap-2.5 rounded-xl border border-accent/10 bg-accent/[0.035] p-3">
            <Lightbulb size={15} className="mt-0.5 shrink-0 text-accent" />
            <p className="text-[11px] leading-relaxed text-ink-300 sm:text-xs">
              <span className="font-semibold text-accent">Pro tip.</span> {example.tip}
            </p>
          </div>

          <CodeBlock code={example.code} compact />

          <Link
            to={`/examples/${example.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-300 transition-colors hover:text-accent"
          >
            Open full example
            <ArrowUpRight size={13} />
          </Link>
        </div>
      )}

      {compact && (
        <div className="flex items-center justify-between gap-3 px-5 pb-5 pt-4 sm:px-6">
          <span className="text-[11px] text-ink-500">{example.categories.join(' · ')}</span>
          <Link
            to={`/examples/${example.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-300 transition-colors hover:text-accent"
          >
            Explore
            <ArrowUpRight size={13} />
          </Link>
        </div>
      )}
    </article>
  )
}
