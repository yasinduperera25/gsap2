import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export function HeroDemo() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray<HTMLElement>('.demo-box', ref.current)

      const timeline = gsap.timeline({
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.7,
        defaults: { ease: 'power2.inOut' },
      })

      timeline
        .to(boxes, {
          x: 20,
          y: -10,
          rotation: 45,
          scale: 1.1,
          backgroundColor: '#c6ff4a',
          color: '#071008',
          stagger: 0.1,
          duration: 0.85,
        })
        .to(
          boxes,
          {
            x: -10,
            y: 12,
            rotation: -20,
            scale: 0.95,
            backgroundColor: '#141c31',
            color: '#c7d0e0',
            stagger: 0.08,
            duration: 0.85,
          },
          '>-0.25',
        )

      gsap.to('.demo-cursor', {
        opacity: 0,
        duration: 0.55,
        repeat: -1,
        yoyo: true,
        ease: 'steps(1)',
      })

      gsap.to('.demo-float', {
        y: -8,
        duration: 2.6,
        ease: 'sine.inOut',
        stagger: 0.4,
        repeat: -1,
        yoyo: true,
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[480px]">
      <div className="absolute -inset-6 rounded-[2.2rem] bg-gradient-to-br from-accent/10 via-cyan/5 to-violet/15 blur-2xl" />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/85 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/6 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-500">
            hero.timeline.ts
          </span>
        </div>

        <div className="relative mt-5 px-5">
          <div className="relative h-44 overflow-hidden rounded-2xl border border-white/6 bg-[#070b14]">
            <div className="absolute inset-0 dot-bg opacity-30" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/[0.04]" />
            <div className="relative flex h-full items-center justify-center gap-3">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="demo-box flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-ink-700 to-ink-850 font-mono text-[10px] font-semibold text-ink-300 shadow-lg"
                  style={{
                    boxShadow: `0 10px 30px rgba(0,0,0,0.35), 0 0 24px ${
                      ['#c6ff4a', '#22d3ee', '#8b5cf6'][index]
                    }10`,
                  }}
                >
                  0{index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 pb-5 pt-4">
          <div className="rounded-xl border border-white/5 bg-[#070b14] px-4 py-3 font-mono text-[10.5px] leading-relaxed text-ink-400">
            <div>
              <span className="text-accent">const</span> tl = gsap.timeline({'{'}
            </div>
            <div className="pl-4">
              repeat: <span className="text-sky-300">-1</span>, yoyo:{' '}
              <span className="text-accent">true</span>
            </div>
            <div>{'}'});</div>
            <div className="mt-1">
              tl.to(<span className="text-amber-300">".box"</span>, {'{'}
            </div>
            <div className="pl-4">
              x: <span className="text-sky-300">20</span>, rotation:{' '}
              <span className="text-sky-300">45</span>
            </div>
            <div>{'}'});</div>
            <span className="demo-cursor mt-1 inline-block h-3 w-1.5 translate-y-0.5 bg-accent" />
          </div>
        </div>
      </div>

      <div className="demo-float absolute -right-3 top-16 rounded-xl border border-cyan/20 bg-ink-900/90 px-3 py-2 shadow-xl backdrop-blur-md sm:-right-6">
        <span className="flex items-center gap-1.5 font-mono text-[9px] text-cyan">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
          ScrollTrigger
        </span>
      </div>

      <div className="demo-float absolute -left-3 bottom-24 rounded-xl border border-accent/20 bg-ink-900/90 px-3 py-2 shadow-xl backdrop-blur-md sm:-left-6">
        <span className="flex items-center gap-1.5 font-mono text-[9px] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          ease: power3.out
        </span>
      </div>

      <div className="demo-float absolute -bottom-3 right-8 rounded-xl border border-violet/20 bg-ink-900/90 px-3 py-2 shadow-xl backdrop-blur-md">
        <span className="flex items-center gap-1.5 font-mono text-[9px] text-violet">
          <span className="h-1.5 w-1.5 rounded-full bg-violet" />
          Flip + Draggable
        </span>
      </div>
    </div>
  )
}
