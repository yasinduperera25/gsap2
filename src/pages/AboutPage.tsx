import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import {
  ArrowRight,
  BookOpen,
  Boxes,
  ExternalLink,
  Layers,
  MousePointerClick,
  ScrollText,
  Sparkles,
  Waypoints,
} from 'lucide-react'
import { CodeBlock } from '@/components/code/CodeBlock'
import { Badge } from '@/components/ui/Badge'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { gsap } from '@/lib/gsap'

const plugins = [
  {
    icon: ScrollText,
    name: 'ScrollTrigger',
    copy: 'Scroll-linked animation, pinning, snapping, batching and scroll-driven scenes.',
  },
  {
    icon: MousePointerClick,
    name: 'Draggable',
    copy: 'Turn any element into a draggable object with bounds, inertia and snapping.',
  },
  {
    icon: Boxes,
    name: 'Flip',
    copy: 'Animate layout changes between two states without writing transform math.',
  },
  {
    icon: Waypoints,
    name: 'MotionPathPlugin',
    copy: 'Move elements along SVG paths with alignment and auto-rotation.',
  },
  {
    icon: Sparkles,
    name: 'SplitText',
    copy: 'Split text into characters, words and lines for editorial reveals.',
  },
  {
    icon: Layers,
    name: 'MorphSVG',
    copy: 'Interpolate between SVG paths for shape-shifting icons and logos.',
  },
]

const aboutCode = `gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene",
    start: "top center",
    end: "bottom center",
    scrub: 1
  }
});

tl.from(".scene-card", {
  y: 80,
  opacity: 0,
  stagger: 0.12
}).to(".scene-card", {
  rotation: 4,
  stagger: 0.08
});`

export function AboutPage() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-about-reveal]', {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          once: true,
        },
      })

      gsap.from('[data-plugin-card]', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: {
          trigger: '[data-plugin-grid]',
          start: 'top 85%',
          once: true,
        },
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-ink-800/80 via-ink-900/90 to-ink-950 p-6 sm:p-10 lg:p-14">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-accent/8 blur-3xl" />

        <div className="relative max-w-3xl">
          <Badge tone="accent" dot>
            About GSAP
          </Badge>
          <h1 className="mt-5 text-4xl font-semibold leading-[0.98] text-ink-50 sm:text-5xl lg:text-6xl">
            A tiny library with an
            <br />
            <span className="gradient-text">enormous range.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-400 sm:text-base">
            GSAP (GreenSock Animation Platform) is a high-performance JavaScript
            animation library. It animates anything JavaScript can touch — CSS,
            SVG, canvas, WebGL, generic objects — with a consistent API and
            frame-perfect timing.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://gsap.com/docs/v3/"
              target="_blank"
              rel="noreferrer"
              className={buttonStyles('primary', 'md')}
            >
              <BookOpen size={14} />
              Read the docs
              <ExternalLink size={13} />
            </a>
            <Link to="/beginner" className={buttonStyles('secondary', 'md')}>
              Start learning
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="The idea"
            title="Motion is part of the interface."
            description="GSAP does not prescribe a design system. It gives you precise control over time, easing and sequencing so motion can become part of how a product communicates."
          />
          <div className="mt-7 space-y-4">
            {[
              {
                title: 'Predictable timing',
                copy: 'A ticker-based core keeps animations in sync, even when many timelines run at once.',
              },
              {
                title: 'Framework agnostic',
                copy: 'Use the same API with React, Vue, Svelte, vanilla JavaScript or a canvas renderer.',
              },
              {
                title: 'Built to compose',
                copy: 'Tweens, timelines, labels and plugins snap together without fighting each other.',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                data-about-reveal
                className="flex gap-3 rounded-2xl border border-white/6 bg-white/[0.02] p-4"
              >
                <span className="font-mono text-[10px] text-accent">0{index + 1}</span>
                <div>
                  <h3 className="text-sm font-semibold text-ink-100">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-400">{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-about-reveal className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/8 via-transparent to-cyan/8 blur-xl" />
          <div className="relative rounded-3xl border border-white/8 bg-ink-900/60 p-3">
            <CodeBlock code={aboutCode} />
            <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-3">
              <span className="text-[10px] uppercase tracking-[0.18em] text-ink-600">
                scroll-linked timeline
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                ScrollTrigger
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Plugin ecosystem"
          title="One core. A deep toolbox."
          description="GSAP plugins extend the core with specialized behavior. These are the plugins featured in the playground."
        />

        <div
          data-plugin-grid
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {plugins.map((plugin) => {
            const Icon = plugin.icon
            return (
              <div
                key={plugin.name}
                data-plugin-card
                className="group rounded-2xl border border-white/8 bg-ink-900/50 p-5 transition-all duration-300 hover:border-accent/20 hover:bg-ink-850/70"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/8 bg-white/[0.03] text-accent transition-colors group-hover:border-accent/25 group-hover:bg-accent/[0.06]">
                  <Icon size={16} />
                </span>
                <h3 className="mt-5 font-display text-sm font-semibold text-ink-100">
                  {plugin.name}
                </h3>
                <p className="mt-2 text-[11px] leading-relaxed text-ink-400">
                  {plugin.copy}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mt-20 grid gap-6 rounded-3xl border border-white/8 bg-ink-900/40 p-6 sm:p-8 lg:grid-cols-3">
        {[
          {
            title: 'Free and open',
            copy: 'As of GSAP 3.13, all plugins are free to use, including the formerly Club-only plugins.',
          },
          {
            title: 'React ready',
            copy: 'The @gsap/react useGSAP hook handles context, cleanup and StrictMode automatically.',
          },
          {
            title: 'Learn by doing',
            copy: 'This playground keeps every example small, interactive and close to the code.',
          },
        ].map((item) => (
          <div key={item.title} data-about-reveal>
            <h3 className="font-display text-base font-semibold text-ink-100">
              {item.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-400">{item.copy}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
