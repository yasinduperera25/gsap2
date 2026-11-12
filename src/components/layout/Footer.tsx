import { Link } from 'react-router-dom'
import { ArrowUp, Code2 } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { examples } from '@/data/examples'

const footerLinks = [
  { label: 'Beginner', to: '/beginner' },
  { label: 'Intermediate', to: '/intermediate' },
  { label: 'Advanced', to: '/advanced' },
  { label: 'ScrollTrigger', to: '/scrolltrigger' },
  { label: 'Playground', to: '/playground' },
  { label: 'About', to: '/about' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/6 bg-ink-950/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-xs leading-relaxed text-ink-500">
              A hands-on animation lab for developers. Explore {examples.length} GSAP
              techniques, tweak the controls and learn the motion behind the interface.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-ink-600">
              <Code2 size={12} className="text-accent" />
              React · Vite · TypeScript · Tailwind
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-2.5 text-xs sm:grid-cols-3">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-ink-400 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://gsap.com"
              target="_blank"
              rel="noreferrer"
              className="text-ink-400 transition-colors hover:text-accent"
            >
              GSAP.com
            </a>
            <a
              href="https://gsap.com/docs/v3/"
              target="_blank"
              rel="noreferrer"
              className="text-ink-400 transition-colors hover:text-accent"
            >
              Documentation
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/6 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase tracking-[0.16em] text-ink-600">
            Built for learning. Motion made tangible.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 self-start text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-500 transition-colors hover:text-accent sm:self-auto"
          >
            Back to top
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  )
}
