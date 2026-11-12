import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  Rocket,
  ScrollText,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { examplesByLevel, scrollExamples } from '@/data/examples'
import { cn } from '@/utils/cn'

const categories = [
  {
    title: 'Beginner',
    to: '/beginner',
    icon: Sparkles,
    count: `${examplesByLevel.beginner.length} examples`,
    description:
      'Tweens, from/to, easing, stagger, timelines, image zooms and the first interactive moments.',
    iconClass: 'border-accent/20 bg-accent/[0.06] text-accent',
    glow: 'bg-accent/10',
    wide: false,
  },
  {
    title: 'Intermediate',
    to: '/intermediate',
    icon: Layers,
    count: `${examplesByLevel.intermediate.length} examples`,
    description:
      'ScrollTrigger reveals, pinning, horizontal scroll, velocity skew, parallax columns, text effects and carousels.',
    iconClass: 'border-cyan/20 bg-cyan/[0.06] text-cyan',
    glow: 'bg-cyan/10',
    wide: false,
  },
  {
    title: 'Advanced',
    to: '/advanced',
    icon: Rocket,
    count: `${examplesByLevel.advanced.length} examples`,
    description:
      'MotionPath, Flip, MorphSVG, page transitions, coverflow carousels and reusable animation systems.',
    iconClass: 'border-violet/20 bg-violet/[0.06] text-violet',
    glow: 'bg-violet/10',
    wide: false,
  },
  {
    title: 'ScrollTrigger',
    to: '/scrolltrigger',
    icon: ScrollText,
    count: `${scrollExamples.length} examples`,
    description:
      'The complete scroll toolkit: triggers, reveals, pinning, batches, velocity skew, parallax and scrubbed scenes.',
    iconClass: 'border-pink/20 bg-pink/[0.06] text-pink',
    glow: 'bg-pink/10',
    wide: false,
  },
  {
    title: 'Interactive Playground',
    to: '/playground',
    icon: SlidersHorizontal,
    count: 'Live controls',
    description:
      'Shape a tween in real time with duration, delay, stagger, easing, position, rotation and scale controls.',
    iconClass: 'border-accent/20 bg-accent/[0.06] text-accent',
    glow: 'bg-accent/10',
    wide: true,
  },
]

export function CategoryGrid() {
  return (
    <section className="border-b border-white/6 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explore"
          title={
            <>
              Pick a path through
              <br />
              <span className="gradient-text-soft">the motion.</span>
            </>
          }
          description="Every example is self-contained, interactive and paired with the code that makes it work. Start at the beginning or jump straight into a technique."
          action={
            <Link to="/beginner" className={buttonStyles('secondary', 'md')}>
              Browse all examples
              <ArrowRight size={14} />
            </Link>
          }
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.title}
                to={category.to}
                className={cn(
                  'group relative overflow-hidden rounded-3xl border border-white/8 bg-ink-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-ink-850/80 hover:shadow-[0_24px_80px_rgba(0,0,0,0.3)]',
                  category.wide && 'md:col-span-2 xl:col-span-1',
                )}
              >
                <div
                  className={cn(
                    'absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100',
                    category.glow,
                    'opacity-60',
                  )}
                />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <span
                      className={cn(
                        'grid h-12 w-12 place-items-center rounded-2xl border',
                        category.iconClass,
                      )}
                    >
                      <Icon size={20} />
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-ink-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </div>

                  <h3 className="mt-8 font-display text-xl font-semibold text-ink-50">
                    {category.title}
                  </h3>
                  <p className="mt-2 min-h-[3.5rem] text-xs leading-relaxed text-ink-400">
                    {category.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-white/6 pt-4">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-ink-500">
                      {category.count}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent opacity-70 transition-opacity group-hover:opacity-100">
                      Explore
                      <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
