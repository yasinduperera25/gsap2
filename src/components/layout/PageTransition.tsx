import { useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger, gsap } from '@/lib/gsap'

export function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useGSAP(
    () => {
      window.scrollTo(0, 0)

      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        )
      }

      const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 140)
      return () => window.clearTimeout(refresh)
    },
    { dependencies: [location.pathname], scope: ref },
  )

  return <div ref={ref}>{children}</div>
}
