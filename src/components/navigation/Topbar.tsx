import { Link, useLocation } from 'react-router-dom'
import { BookOpen, ChevronRight, Menu, SlidersHorizontal } from 'lucide-react'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { exampleById } from '@/data/examples'

const pageTitles: Record<string, string> = {
  '/': 'Overview',
  '/beginner': 'Beginner Animations',
  '/intermediate': 'Intermediate Animations',
  '/advanced': 'Advanced Animations',
  '/scrolltrigger': 'ScrollTrigger',
  '/playground': 'Interactive Playground',
  '/about': 'About GSAP',
}

interface TopbarProps {
  onMenu: () => void
}

export function Topbar({ onMenu }: TopbarProps) {
  const location = useLocation()
  const exampleId = location.pathname.startsWith('/examples/')
    ? location.pathname.split('/')[2]
    : null
  const example = exampleId ? exampleById.get(exampleId) : undefined
  const title = example?.title ?? pageTitles[location.pathname] ?? 'Not Found'

  return (
    <header className="sticky top-0 z-30 border-b border-white/6 bg-ink-950/75 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenu}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/8 bg-white/[0.03] text-ink-300 transition-colors hover:border-white/15 hover:text-ink-50 lg:hidden"
            aria-label="Open navigation"
          >
            <Menu size={17} />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-ink-500">
              <span>Playground</span>
              <ChevronRight size={10} />
              <span className="truncate text-ink-400">{title}</span>
            </div>
            <h1 className="truncate font-display text-sm font-semibold text-ink-100">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium text-ink-400 md:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#c6ff4a]" />
            30 examples
          </span>

          <a
            href="https://gsap.com/docs/v3/"
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-3 text-xs font-medium text-ink-300 transition-colors hover:border-white/15 hover:text-ink-50 sm:inline-flex"
          >
            <BookOpen size={14} />
            Docs
          </a>

          <Link
            to="/playground"
            className={buttonStyles('primary', 'sm', 'h-9 rounded-lg px-3')}
          >
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">Open playground</span>
            <span className="sm:hidden">Play</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
