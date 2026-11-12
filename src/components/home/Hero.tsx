import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { ArrowRight, Play, Sparkles, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { examples } from '@/data/examples'
import { gsap } from '@/lib/gsap'
import { HeroBackground } from './HeroBackground'
import { HeroDemo } from './HeroDemo'

const marqueeItems = [
  'gsap.to()',
  'ScrollTrigger',
  'Timeline',
  'Stagger',
  'Draggable',
  'Flip',
  'MotionPath',
  'MorphSVG',
  'SplitText',
  'DrawSVG',
  'quickTo()',
  'matchMedia()',
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-hero-line]', {
        yPercent: 115,
        duration: 1.05,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.1,
      })

      gsap.from('[data-hero-item]', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.2,
      })

      gsap.from('[data-hero-visual]', {
        opacity: 0,
        scale: 0.94,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 0.35,
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-white/6">
      <HeroBackground />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:px-8 lg:pb-24 lg:pt-20">
        <div>
          <div data-hero-item className="flex flex-wrap items-center gap-2">
            <Badge tone="accent" dot>
              GSAP 3.15 · Interactive lab
            </Badge>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.025] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-400">
              <Zap size={10} className="text-cyan" />
              {examples.length} live examples
            </span>
          </div>

          <h1 className="mt-6 text-[2.7rem] font-semibold leading-[0.94] text-ink-50 sm:text-6xl lg:text-[4.6rem]">
            <span className="block overflow-hidden pb-1">
              <span data-hero-line className="block">
                Animate the web.
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span data-hero-line className="gradient-text block">
                Feel the motion.
              </span>
            </span>
          </h1>

          <p
            data-hero-item
            className="mt-6 max-w-xl text-sm leading-relaxed text-ink-400 sm:text-base"
          >
            A premium playground for learning GSAP by doing. Explore tweens,
            timelines, ScrollTrigger scenes, SVG morphs and interactive motion —
            then inspect the exact code behind every frame.
          </p>

          <div data-hero-item className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/beginner" className={buttonStyles('primary', 'lg')}>
              <Sparkles size={15} />
              Start learning
              <ArrowRight size={15} />
            </Link>
            <Link to="/playground" className={buttonStyles('secondary', 'lg')}>
              <Play size={14} />
              Open playground
            </Link>
          </div>

          <div
            data-hero-item
            className="mt-9 grid max-w-lg grid-cols-3 gap-4 border-t border-white/8 pt-6"
          >
            {[
              { value: String(examples.length), label: 'animations' },
              { value: '8', label: 'plugins' },
              { value: '100%', label: 'interactive' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-xl font-semibold text-ink-50 sm:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-ink-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <p
            data-hero-item
            className="mt-6 text-[10px] uppercase tracking-[0.18em] text-ink-600"
          >
            No sign-up. No setup. Just motion.
          </p>
        </div>

        <div data-hero-visual className="relative">
          <HeroDemo />
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/6 py-4">
        <div className="marquee-track flex w-max items-center gap-8">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-8 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.24em] text-ink-600"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-accent/40" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
