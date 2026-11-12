import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface LogoProps {
  compact?: boolean
  className?: string
  onClick?: () => void
}

export function Logo({ compact, className, onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn('group flex items-center gap-3', className)}
      aria-label="GSAP Playground home"
    >
      <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-accent via-cyan to-violet shadow-[0_0_28px_rgba(198,255,74,0.18)]">
        <span className="absolute inset-[1px] rounded-[11px] bg-ink-950/90" />
        <svg
          viewBox="0 0 24 24"
          className="relative h-5 w-5"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M18 7.5C16.9 5.9 15.1 5 13 5c-3.3 0-6 2.7-6 6s2.7 6 6 6c2.6 0 4.7-1.6 5.6-3.8H13"
            stroke="url(#logo-gradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="logo-gradient" x1="6" y1="5" x2="19" y2="17">
              <stop stopColor="#c6ff4a" />
              <stop offset="0.55" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#c6ff4a]" />
      </span>
      {!compact && (
        <span className="flex min-w-0 flex-col">
          <span className="font-display text-sm font-semibold tracking-wide text-ink-50">
            GSAP Playground
          </span>
          <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-ink-400">
            Interactive animation lab
          </span>
        </span>
      )}
    </Link>
  )
}
