import { useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger, gsap } from '@/lib/gsap'

const transitionBars = [
  'linear-gradient(180deg, #c6ff4a, #8fbf1f)',
  'linear-gradient(180deg, #22d3ee, #0e7490)',
  'linear-gradient(180deg, #8b5cf6, #5b21b6)',
]

export function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useGSAP(
    () => {
      window.scrollTo(0, 0)

      const overlay = overlayRef.current
      const bars = overlay
        ? Array.from(
            overlay.querySelectorAll<HTMLElement>('[data-transition-bar]'),
          )
        : []
      const content = ref.current

      if (overlay && bars.length > 0) {
        const timeline = gsap.timeline()

        timeline
          .set(overlay, { display: 'grid' })
          .fromTo(
            bars,
            { yPercent: -100 },
            {
              yPercent: 0,
              duration: 0.4,
              stagger: 0.06,
              ease: 'power4.inOut',
            },
          )

        if (content) {
          timeline.fromTo(
            content,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
            '-=0.1',
          )
        }

        timeline
          .to(bars, {
            yPercent: 100,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power4.inOut',
          })
          .set(overlay, { display: 'none' })
      } else if (content) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        )
      }

      const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 260)
      return () => window.clearTimeout(refresh)
    },
    { dependencies: [location.pathname], scope: ref },
  )

  return (
    <>
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 hidden grid-cols-3 overflow-hidden"
      >
        {transitionBars.map((background) => (
          <span
            key={background}
            data-transition-bar
            className="block h-full w-full"
            style={{ background, transform: 'translateY(-100%)' }}
          />
        ))}
      </div>
      <div ref={ref}>{children}</div>
    </>
  )
}
