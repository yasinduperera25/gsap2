import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const particles = [
  { left: '12%', top: '22%', delay: 0 },
  { left: '24%', top: '70%', delay: 0.6 },
  { left: '38%', top: '14%', delay: 1.2 },
  { left: '54%', top: '62%', delay: 0.3 },
  { left: '68%', top: '28%', delay: 1.6 },
  { left: '82%', top: '74%', delay: 0.9 },
  { left: '90%', top: '18%', delay: 1.4 },
  { left: '46%', top: '84%', delay: 0.2 },
]

export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const orbs = gsap.utils.toArray<HTMLElement>('.hero-orb')
      const movers = orbs.map((orb) => ({
        depth: Number(orb.dataset.depth ?? 1),
        x: gsap.quickTo(orb, 'x', { duration: 1.1, ease: 'power3.out' }),
        y: gsap.quickTo(orb, 'y', { duration: 1.1, ease: 'power3.out' }),
      }))

      const onMove = (event: MouseEvent) => {
        const x = event.clientX / window.innerWidth - 0.5
        const y = event.clientY / window.innerHeight - 0.5

        movers.forEach((mover) => {
          mover.x(x * mover.depth * 46)
          mover.y(y * mover.depth * 46)
        })
      }

      window.addEventListener('mousemove', onMove)

      gsap.to(orbs, {
        scale: 1.08,
        opacity: 0.82,
        duration: 4.5,
        ease: 'sine.inOut',
        stagger: 0.6,
        repeat: -1,
        yoyo: true,
      })

      gsap.to('.hero-particle', {
        y: -12,
        opacity: 0.9,
        duration: 2.2,
        ease: 'sine.inOut',
        stagger: 0.18,
        repeat: -1,
        yoyo: true,
      })

      return () => window.removeEventListener('mousemove', onMove)
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 grid-bg opacity-60" />

      <div
        data-depth="1.2"
        className="hero-orb absolute -left-24 top-8 h-[26rem] w-[26rem] rounded-full bg-violet/20 blur-[110px]"
      />
      <div
        data-depth="0.7"
        className="hero-orb absolute -right-32 top-1/4 h-[30rem] w-[30rem] rounded-full bg-cyan/15 blur-[120px]"
      />
      <div
        data-depth="1.5"
        className="hero-orb absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-accent/10 blur-[100px]"
      />

      <div className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />
      <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
      <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/10" />

      {particles.map((particle, index) => (
        <span
          key={index}
          className="hero-particle absolute h-1 w-1 rounded-full bg-accent/70 shadow-[0_0_10px_#c6ff4a]"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  )
}
