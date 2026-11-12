import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BookOpen, ExternalLink, X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Logo } from '@/components/ui/Logo'
import { SearchField } from '@/components/ui/SearchField'
import { examples } from '@/data/examples'
import { navSections } from '@/data/navigation'
import { cn } from '@/utils/cn'
import { padIndex } from '@/utils/format'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return []

    return examples
      .filter((example) =>
        [example.title, example.summary, example.level, ...example.categories]
          .join(' ')
          .toLowerCase()
          .includes(term),
      )
      .slice(0, 6)
  }, [query])

  const handleClose = useCallback(() => {
    setQuery('')
    onClose()
  }, [onClose])

  useEffect(() => {
    onClose()
  }, [location.pathname, onClose])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)

      if (event.key === '/' && !isTyping) {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/65 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={handleClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-white/8 bg-ink-950/95 backdrop-blur-xl transition-transform duration-300 ease-out lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-5 pb-5 pt-5">
          <Logo onClick={handleClose} />
          <button
            type="button"
            onClick={handleClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-white/5 hover:text-ink-100 lg:hidden"
            aria-label="Close navigation"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-4">
          <SearchField
            value={query}
            onChange={setQuery}
            placeholder={`Search ${examples.length} examples...`}
            inputRef={inputRef}
            shortcut="/"
          />

          {query && (
            <div className="mt-2 overflow-hidden rounded-xl border border-white/8 bg-ink-900/95 shadow-2xl">
              {results.length > 0 ? (
                <div className="max-h-72 overflow-y-auto py-1">
                  {results.map((example) => (
                    <Link
                      key={example.id}
                      to={`/examples/${example.id}`}
                      onClick={handleClose}
                      className="flex items-start gap-3 px-3 py-2.5 transition-colors hover:bg-white/[0.05]"
                    >
                      <span className="mt-0.5 font-mono text-[9px] text-ink-600">
                        {padIndex(example.order)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-medium text-ink-100">
                          {example.title}
                        </span>
                        <span className="mt-1 flex items-center gap-1.5">
                          <Badge tone={example.level} className="px-1.5 py-0 text-[8px]">
                            {example.level}
                          </Badge>
                          <span className="truncate text-[10px] text-ink-500">
                            {example.categories[0]}
                          </span>
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-3 py-4 text-center text-xs text-ink-500">
                  No examples match "{query}"
                </div>
              )}
            </div>
          )}
        </div>

        <nav className="mt-6 flex-1 overflow-y-auto px-3 pb-4">
          {navSections.map((section) => (
            <div key={section.title} className="mb-6">
              <div className="mb-2 px-3 text-[9px] font-semibold uppercase tracking-[0.24em] text-ink-600">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.exact}
                      onClick={handleClose}
                      className={({ isActive }) =>
                        cn(
                          'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200',
                          isActive
                            ? 'bg-accent/10 text-accent'
                            : 'text-ink-400 hover:bg-white/[0.04] hover:text-ink-100',
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_#c6ff4a]" />
                          )}
                          <Icon
                            size={16}
                            className={cn(
                              'shrink-0 transition-colors',
                              isActive ? 'text-accent' : 'text-ink-500 group-hover:text-ink-300',
                            )}
                          />
                          <span className="min-w-0 flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={cn(
                                'rounded-md px-1.5 py-0.5 font-mono text-[9px]',
                                isActive
                                  ? 'bg-accent/15 text-accent'
                                  : 'bg-white/[0.04] text-ink-600',
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/6 p-4">
          <div className="rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.04] to-transparent p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#c6ff4a]" />
                GSAP 3.15
              </span>
              <a
                href="https://gsap.com/docs/v3/"
                target="_blank"
                rel="noreferrer"
                className="text-ink-500 transition-colors hover:text-accent"
                aria-label="Open GSAP documentation"
              >
                <ExternalLink size={13} />
              </a>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-ink-500">
              All plugins are free and ready to explore in this lab.
            </p>
            <a
              href="https://gsap.com/docs/v3/"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent transition-opacity hover:opacity-80"
            >
              <BookOpen size={11} />
              Read the docs
            </a>
          </div>
        </div>
      </aside>
    </>
  )
}
