import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { ArrowLeft, Compass, Home } from 'lucide-react'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { gsap } from '@/lib/gsap'

const suggestions = [
  { label: 'Beginner animations', to: '/beginner' },
  { label: 'ScrollTrigger', to: '/scrolltrigger' },
  { label: 'Interactive playground', to: '/playground' },
]

export function NotFoundPage() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-notfound-item]', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
      })

      gsap.to('[data-notfound-orbit]', {
        rotation: 360,
        duration: 22,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center',
      })
    },
    { scope: ref },
  )

  return (
    <div
      ref={ref}
      className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />

      <div className="relative">
        <div
          data-notfound-orbit
          className="absolute left-1/2 top-1/2 -z-10 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/20"
        />
        <div className="absolute left-1/2 top-1/2 -z-10 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-2xl" />
        <span
          data-notfound-item
          className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-400"
        >
          <Compass size={12} className="text-accent" />
          Off the timeline
        </span>
        <h1
          data-notfound-item
          className="mt-6 font-mono text-7xl font-semibold tracking-tighter text-ink-50 sm:text-8xl"
        >
          4<span className="gradient-text">0</span>4
        </h1>
        <h2
          data-notfound-item
          className="mt-4 font-display text-2xl font-semibold text-ink-100 sm:text-3xl"
        >
          This frame does not exist.
        </h2>
        <p
          data-notfound-item
          className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-400"
        >
          The route you followed is not part of the playground. Rewind to the
          overview or pick a track below.
        </p>

        <div data-notfound-item className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/" className={buttonStyles('primary', 'md')}>
            <Home size={14} />
            Back to overview
          </Link>
          <Link to="/beginner" className={buttonStyles('secondary', 'md')}>
            <ArrowLeft size={14} />
            Browse animations
          </Link>
        </div>

        <div
          data-notfound-item
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {suggestions.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full border border-white/8 bg-white/[0.02] px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-ink-500 transition-colors hover:border-white/15 hover:text-ink-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
