import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Hand,
  Lightbulb,
  MousePointer2,
  ScrollText,
} from 'lucide-react'
import { AnimationCard } from '@/components/animations/AnimationCard'
import { AnimationStage } from '@/components/animations/AnimationStage'
import { CodeBlock } from '@/components/code/CodeBlock'
import { Badge, LevelBadge } from '@/components/ui/Badge'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { exampleById, examples } from '@/data/examples'
import { padIndex } from '@/utils/format'

export function ExampleDetailPage() {
  const { id } = useParams()
  const example = id ? exampleById.get(id) : undefined

  if (!example) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-500">
          404 / example
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink-50">
          That animation does not exist.
        </h1>
        <p className="mt-3 text-sm text-ink-400">
          It may have moved, or the link is incomplete. Head back to the library to
          keep exploring.
        </p>
        <Link to="/beginner" className={buttonStyles('primary', 'md', 'mt-6')}>
          Browse examples
          <ArrowRight size={14} />
        </Link>
      </div>
    )
  }

  const index = examples.findIndex((item) => item.id === example.id)
  const previous = examples[(index - 1 + examples.length) % examples.length]
  const next = examples[(index + 1) % examples.length]
  const related = examples
    .filter(
      (item) =>
        item.id !== example.id &&
        item.level === example.level &&
        item.categories.some((category) => example.categories.includes(category)),
    )
    .slice(0, 2)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link
        to={`/${example.level}`}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-400 transition-colors hover:text-accent"
      >
        <ArrowLeft size={13} />
        Back to {example.level} animations
      </Link>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <LevelBadge level={example.level} />
            {example.categories.map((category) => (
              <Badge key={category} tone="muted">
                {category}
              </Badge>
            ))}
            <span className="font-mono text-[10px] text-ink-600">
              {padIndex(example.order)} / {examples.length}
            </span>
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-ink-50 sm:text-4xl lg:text-5xl">
            {example.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-400 sm:text-base">
            {example.summary}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/examples/${previous.id}`}
            className={buttonStyles('secondary', 'sm')}
          >
            <ArrowLeft size={13} />
            Previous
          </Link>
          <Link to={`/examples/${next.id}`} className={buttonStyles('secondary', 'sm')}>
            Next
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <AnimationStage example={example} />

          <div className="rounded-2xl border border-white/8 bg-ink-900/40 p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-500">
                Source
              </span>
              <span className="font-mono text-[10px] text-ink-600">typescript</span>
            </div>
            <CodeBlock code={example.code} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/8 bg-ink-900/40 p-5">
            <h2 className="font-display text-lg font-semibold text-ink-100">
              How it works
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-400">
              {example.explanation}
            </p>
          </div>

          <div className="rounded-2xl border border-accent/12 bg-accent/[0.035] p-5">
            <div className="flex items-center gap-2 text-accent">
              <Lightbulb size={15} />
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                Pro tip
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-300">{example.tip}</p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-ink-900/40 p-5">
            <h2 className="font-display text-lg font-semibold text-ink-100">
              Controls
            </h2>
            <div className="mt-4 space-y-3 text-xs text-ink-400">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/[0.04] text-ink-300">
                  <ArrowRight size={12} />
                </span>
                Use <strong className="font-semibold text-ink-200">Play</strong> to run the timeline.
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/[0.04] text-ink-300">
                  <span className="h-2 w-2 rounded-sm bg-current" />
                </span>
                Use <strong className="font-semibold text-ink-200">Pause</strong> to freeze the current frame.
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/[0.04] text-ink-300">
                  <ArrowLeft size={12} />
                </span>
                Use <strong className="font-semibold text-ink-200">Restart</strong> to reset and replay.
              </div>
              {example.interaction === 'scroll' && (
                <div className="flex items-start gap-3 border-t border-white/6 pt-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/[0.04] text-cyan">
                    <ScrollText size={12} />
                  </span>
                  Scroll inside the preview to drive the ScrollTrigger timeline.
                </div>
              )}
              {example.interaction === 'drag' && (
                <div className="flex items-start gap-3 border-t border-white/6 pt-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/[0.04] text-pink">
                    <Hand size={12} />
                  </span>
                  Grab and throw the tokens inside the preview bounds.
                </div>
              )}
              {example.interaction === 'hover' && (
                <div className="flex items-start gap-3 border-t border-white/6 pt-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/[0.04] text-accent">
                    <MousePointer2 size={12} />
                  </span>
                  Hover the preview card to play the micro-interaction.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-ink-50">
              Related examples
            </h2>
            <Link
              to={`/${example.level}`}
              className="text-xs font-semibold text-ink-400 transition-colors hover:text-accent"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {related.map((item) => (
              <AnimationCard key={item.id} example={item} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
