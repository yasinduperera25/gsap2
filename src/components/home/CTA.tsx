import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { ArrowRight, SlidersHorizontal, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { gsap } from '@/lib/gsap'

export function CTA() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to('.cta-float', {
        y: -10,
        duration: 2.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    },
    { scope: ref },
  )

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-[2rem] border border-accent/15 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-8 sm:p-12 lg:p-16"
        >
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-violet/10 blur-3xl" />

          <div className="relative max-w-2xl">
            <Badge tone="accent" dot>
              Ready when you are
            </Badge>
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-ink-50 sm:text-4xl lg:text-5xl">
              Make motion
              <br />
              <span className="gradient-text">matter.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-400 sm:text-base">
              Open the playground, move a few sliders and watch the timeline update
              in real time. When something clicks, copy the code and take it with
              you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/playground" className={buttonStyles('primary', 'lg')}>
                <SlidersHorizontal size={15} />
                Open playground
                <ArrowRight size={15} />
              </Link>
              <Link to="/about" className={buttonStyles('secondary', 'lg')}>
                <Sparkles size={14} />
                About GSAP
              </Link>
            </div>
          </div>

          <div className="cta-float pointer-events-none absolute -right-8 bottom-10 hidden w-64 rotate-2 rounded-2xl border border-white/10 bg-[#070b14]/90 p-4 shadow-2xl backdrop-blur-md lg:block">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="font-mono text-[10px] leading-relaxed text-ink-400">
              <div>
                <span className="text-accent">gsap</span>.to(
                <span className="text-amber-300">".box"</span>, {'{'}
              </div>
              <div className="pl-3">
                x: <span className="text-sky-300">120</span>,
              </div>
              <div className="pl-3">
                ease: <span className="text-amber-300">"power3.out"</span>
              </div>
              <div>{'}'});</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
