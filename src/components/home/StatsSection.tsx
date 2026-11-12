import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Gauge, Layers, MousePointer2, Zap } from 'lucide-react'
import { examples } from '@/data/examples'
import { gsap } from '@/lib/gsap'

const stats = [
  {
    icon: Layers,
    value: examples.length,
    suffix: '+',
    label: 'Animation examples',
    detail: 'From first tween to advanced scroll scenes.',
  },
  {
    icon: Zap,
    value: 8,
    suffix: '',
    label: 'GSAP plugins',
    detail: 'ScrollTrigger, Flip, Draggable, MorphSVG and more.',
  },
  {
    icon: Gauge,
    value: 3,
    suffix: '',
    label: 'Difficulty levels',
    detail: 'A clear path from fundamentals to advanced motion.',
  },
  {
    icon: MousePointer2,
    value: 100,
    suffix: '%',
    label: 'Interactive',
    detail: 'Play, pause, restart and inspect every example.',
  },
]

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-stat]', ref.current)

      items.forEach((item) => {
        const value = Number(item.dataset.value ?? 0)
        const suffix = item.dataset.suffix ?? ''
        const output = item.querySelector<HTMLElement>('[data-stat-value]')
        const counter = { value: 0 }

        gsap.to(counter, {
          value,
          duration: 1.6,
          ease: 'power2.out',
          snap: { value: 1 },
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 88%',
            once: true,
          },
          onUpdate: () => {
            if (output) {
              output.textContent = `${Math.round(counter.value)}${suffix}`
            }
          },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section className="border-b border-white/6 py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/[0.04] lg:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                data-stat
                data-value={stat.value}
                data-suffix={stat.suffix}
                className="group relative bg-ink-900/90 p-5 transition-colors hover:bg-ink-850 sm:p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/8 bg-white/[0.03] text-accent transition-colors group-hover:border-accent/20 group-hover:bg-accent/[0.06]">
                    <Icon size={16} />
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/40" />
                </div>
                <div className="font-display text-3xl font-semibold tracking-tight text-ink-50 sm:text-4xl">
                  <span data-stat-value>0</span>
                </div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                  {stat.label}
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-ink-600">
                  {stat.detail}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
