import { useDeferredValue, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { ArrowRight, SearchX, SlidersHorizontal, Sparkles } from 'lucide-react'
import { AnimationCard } from '@/components/animations/AnimationCard'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { SearchField } from '@/components/ui/SearchField'
import { examples, examplesByLevel } from '@/data/examples'
import { gsap } from '@/lib/gsap'
import type { ExampleCategory, LevelSlug } from '@/types'
import { cn } from '@/utils/cn'

interface ExamplesPageProps {
  eyebrow: string
  title: string
  description: string
  level?: LevelSlug
  filterCategory?: ExampleCategory
}

type CategoryFilter = ExampleCategory | 'All'

export function ExamplesPage({
  eyebrow,
  title,
  description,
  level,
  filterCategory,
}: ExamplesPageProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('All')
  const deferredQuery = useDeferredValue(query)
  const heroRef = useRef<HTMLDivElement>(null)

  const baseExamples = useMemo(() => {
    if (level) return examplesByLevel[level]
    if (filterCategory) {
      return examples.filter((example) => example.categories.includes(filterCategory))
    }
    return examples
  }, [level, filterCategory])

  const categories = useMemo(() => {
    const set = new Set<ExampleCategory>()
    baseExamples.forEach((example) => {
      example.categories.forEach((item) => set.add(item))
    })
    return ['All', ...Array.from(set)] as CategoryFilter[]
  }, [baseExamples])

  const filtered = useMemo(() => {
    const term = deferredQuery.trim().toLowerCase()

    return baseExamples.filter((example) => {
      const matchesCategory =
        category === 'All' || example.categories.includes(category)
      const matchesSearch =
        !term ||
        [example.title, example.summary, example.explanation, example.level, ...example.categories]
          .join(' ')
          .toLowerCase()
          .includes(term)

      return matchesCategory && matchesSearch
    })
  }, [baseExamples, category, deferredQuery])

  useGSAP(
    () => {
      if (!heroRef.current) return

      gsap.from(heroRef.current.querySelectorAll('[data-hero-item]'), {
        y: 26,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
      })
    },
    { scope: heroRef },
  )

  const resetFilters = () => {
    setQuery('')
    setCategory('All')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section
        ref={heroRef}
        className="relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-ink-800/80 via-ink-900/90 to-ink-950 p-6 sm:p-10"
      >
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/[0.07] blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-violet/[0.08] blur-3xl" />

        <div className="relative max-w-3xl">
          <div
            data-hero-item
            className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent"
          >
            <span className="h-px w-6 bg-accent/50" />
            {eyebrow}
          </div>
          <h1
            data-hero-item
            className="text-4xl font-semibold leading-[0.98] text-ink-50 sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>
          <p
            data-hero-item
            className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-400 sm:text-base"
          >
            {description}
          </p>

          <div data-hero-item className="mt-7 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-ink-400">
              <Sparkles size={12} className="text-accent" />
              {baseExamples.length} examples
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-ink-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              Play · Pause · Restart
            </span>
            <Link
              to="/playground"
              className={buttonStyles('secondary', 'sm', 'rounded-full')}
            >
              <SlidersHorizontal size={13} />
              Try the playground
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/8 bg-ink-900/40 p-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Filter by title, tag or concept..."
          className="w-full sm:max-w-sm"
        />
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-500">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {filtered.length} of {baseExamples.length} visible
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-200',
              category === item
                ? 'border-accent/40 bg-accent/10 text-accent'
                : 'border-white/8 bg-white/[0.02] text-ink-500 hover:border-white/15 hover:text-ink-300',
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {filtered.map((example) => (
            <AnimationCard key={example.id} example={example} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-ink-900/30 px-6 py-20 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/8 bg-white/[0.03] text-ink-500">
            <SearchX size={22} />
          </span>
          <h2 className="mt-5 font-display text-xl font-semibold text-ink-100">
            No examples found
          </h2>
          <p className="mt-2 max-w-sm text-sm text-ink-500">
            Try a different search term or clear the active category filter.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className={buttonStyles('secondary', 'sm', 'mt-5')}
          >
            Reset filters
            <ArrowRight size={13} />
          </button>
        </div>
      )}
    </div>
  )
}
