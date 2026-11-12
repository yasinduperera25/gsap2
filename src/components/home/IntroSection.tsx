import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Layers, ScrollText, Zap } from 'lucide-react'
import { CodeBlock } from '@/components/code/CodeBlock'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { gsap } from '@/lib/gsap'

const features = [
  {
    icon: Zap,
    title: 'Tween anything',
    copy: 'Animate CSS, SVG attributes, canvas objects and plain JavaScript values with one consistent API.',
  },
  {
    icon: Layers,
    title: 'Compose with timelines',
    copy: 'Sequence motion with labels and position parameters so complex choreography stays readable.',
  },
  {
    icon: ScrollText,
    title: 'Connect to scroll',
    copy: 'ScrollTrigger turns scroll position into a timeline playhead, complete with pinning and scrubbing.',
  },
]

const introCode = `const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    start: "top center",
    end: "bottom center",
    scrub: true
  }
});

tl.from(".card", {
  y: 60,
  opacity: 0,
  stagger: 0.12
}).to(".card", {
  backgroundColor: "#c6ff4a",
  stagger: 0.08
});`

export function IntroSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-intro-feature]', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          once: true,
        },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="border-b border-white/6 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why GSAP"
          title={
            <>
              Motion that teaches,
              <br />
              <span className="gradient-text-soft">not distracts.</span>
            </>
          }
          description="GSAP is a high-performance animation library with a tiny API and an enormous range. This playground breaks it into small, inspectable pieces so the concepts stick."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-2">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  data-intro-feature
                  className="group flex gap-4 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-white/8 hover:bg-white/[0.025]"
                >
                  <div className="flex flex-col items-center">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/8 bg-white/[0.03] text-accent transition-colors group-hover:border-accent/25 group-hover:bg-accent/[0.06]">
                      <Icon size={17} />
                    </span>
                    <span className="mt-2 font-mono text-[9px] text-ink-600">
                      0{index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-100">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-400 sm:text-sm">
                      {feature.copy}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div data-intro-feature className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/8 via-transparent to-violet/10 blur-xl" />
            <div className="relative rounded-3xl border border-white/8 bg-ink-900/60 p-3">
              <CodeBlock code={introCode} />
              <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-3">
                <span className="text-[10px] uppercase tracking-[0.18em] text-ink-600">
                  scroll-linked timeline
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  scrub: true
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
