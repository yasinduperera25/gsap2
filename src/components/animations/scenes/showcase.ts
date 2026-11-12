import { Draggable, gsap } from '@/lib/gsap'
import { emptyTimeline, q, qa, type SceneBuilder } from './helpers'

export const textTypewriter: SceneBuilder = ({ root }) => {
  const text = q<HTMLElement>(root, '[data-typewriter-text]')
  const cursor = q<HTMLElement>(root, '[data-typewriter-cursor]')
  const sub = q<HTMLElement>(root, '[data-typewriter-sub]')

  if (!text) return emptyTimeline()

  const full = text.textContent ?? ''
  text.textContent = ''

  const state = { count: 0 }
  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    repeatDelay: 1.4,
    onRepeat: () => {
      state.count = 0
      text.textContent = ''
    },
  })

  timeline.to(state, {
    count: full.length,
    duration: Math.max(1.6, full.length * 0.055),
    ease: 'none',
    onUpdate: () => {
      text.textContent = full.slice(0, Math.round(state.count))
    },
  })

  if (sub) {
    timeline.fromTo(
      sub,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      0,
    )
  }

  if (cursor) {
    gsap.to(cursor, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'steps(1)',
    })
  }

  return { mode: 'timeline', timeline }
}

export const textMarquee: SceneBuilder = ({ root }) => {
  const tracks = qa<HTMLElement>(root, '[data-marquee-track]')

  if (tracks.length === 0) return emptyTimeline()

  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    defaults: { ease: 'none' },
  })

  tracks.forEach((track, index) => {
    const reverse = track.dataset.direction === 'reverse'

    timeline.fromTo(
      track,
      { xPercent: reverse ? -50 : 0 },
      {
        xPercent: reverse ? 0 : -50,
        duration: 14 + index * 4,
      },
      0,
    )
  })

  return { mode: 'timeline', timeline }
}

export const carouselSlides: SceneBuilder = ({ root }) => {
  const track = q<HTMLElement>(root, '[data-carousel-track]')
  const slides = qa<HTMLElement>(root, '[data-carousel-slide]')
  const dots = qa<HTMLElement>(root, '[data-carousel-dot]')

  if (!track || slides.length < 2) return emptyTimeline()

  const setActive = (active: number) => {
    dots.forEach((dot, index) => {
      const current = index === active
      dot.style.opacity = current ? '1' : '0.35'
      dot.style.width = current ? '22px' : '8px'
      dot.style.backgroundColor = current ? '#c6ff4a' : 'rgba(255,255,255,0.25)'
    })
  }

  const width = () => track.clientWidth
  setActive(0)

  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    repeatDelay: 0.6,
  })

  for (let index = 1; index < slides.length; index += 1) {
    timeline.to(track, {
      x: () => -index * width(),
      duration: 0.75,
      ease: 'power3.inOut',
      onStart: () => setActive(index),
    })
  }

  timeline.to({}, { duration: 1.1 })
  timeline.to(track, {
    x: 0,
    duration: 0.75,
    ease: 'power3.inOut',
    onStart: () => setActive(0),
  })

  const reset = () => {
    gsap.set(track, { x: 0 })
    setActive(0)
  }

  return { mode: 'timeline', timeline, onRestart: reset }
}

export const carouselDrag: SceneBuilder = ({ root }) => {
  const viewport = q<HTMLElement>(root, '[data-carousel-window]')
  const track = q<HTMLElement>(root, '[data-carousel-drag-track]')
  const slides = qa<HTMLElement>(root, '[data-carousel-drag-slide]')

  if (!viewport || !track || slides.length === 0) return emptyTimeline()

  const baseOffset = slides[0].offsetLeft
  const offsets = slides.map((slide) => -(slide.offsetLeft - baseOffset))
  const minX = Math.min(0, viewport.clientWidth - track.scrollWidth)

  const draggables = Draggable.create(track, {
    type: 'x',
    bounds: { minX, maxX: 0 },
    inertia: true,
    edgeResistance: 0.7,
    cursor: 'grab',
    activeCursor: 'grabbing',
    snap: {
      x: (value: number) => {
        let closest = 0
        let distance = Number.POSITIVE_INFINITY

        offsets.forEach((offset) => {
          const candidate = Math.max(minX, Math.min(0, offset))
          const delta = Math.abs(candidate - value)
          if (delta < distance) {
            distance = delta
            closest = candidate
          }
        })

        return closest
      },
    },
  })

  const timeline = gsap.timeline({ paused: true })

  timeline.from(slides, {
    opacity: 0,
    y: 32,
    duration: 0.6,
    stagger: 0.06,
    ease: 'power3.out',
  })

  return {
    mode: 'timeline',
    timeline,
    onKill: () => {
      draggables.forEach((draggable) => draggable.kill())
    },
  }
}

export const pageTransition: SceneBuilder = ({ root }) => {
  const pages = qa<HTMLElement>(root, '[data-transition-page]')
  const strips = qa<HTMLElement>(root, '[data-transition-strip]')

  if (pages.length < 2 || strips.length === 0) return emptyTimeline()

  const reset = () => {
    gsap.set(pages[0], { yPercent: 0 })
    gsap.set(pages[1], { yPercent: 100 })
    gsap.set(strips, { yPercent: 100 })
  }

  reset()

  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    repeatDelay: 0.4,
  })

  timeline
    .to(strips, {
      yPercent: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power4.inOut',
    })
    .set(pages[0], { yPercent: -100 })
    .set(pages[1], { yPercent: 0 })
    .to(strips, {
      yPercent: -100,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power4.inOut',
    })
    .to({}, { duration: 1 })
    .to(strips, {
      yPercent: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power4.inOut',
    })
    .set(pages[0], { yPercent: 0 })
    .set(pages[1], { yPercent: 100 })
    .to(strips, {
      yPercent: -100,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power4.inOut',
    })
    .to({}, { duration: 0.9 })
    .set(strips, { yPercent: 100 })

  return { mode: 'timeline', timeline, onRestart: reset }
}

export const imageTilt: SceneBuilder = ({ root }) => {
  const card = q<HTMLElement>(root, '[data-tilt-card]')
  const shine = q<HTMLElement>(root, '[data-tilt-shine]')

  if (!card) return emptyTimeline()

  const rotateX = gsap.quickTo(card, 'rotationX', {
    duration: 0.5,
    ease: 'power3.out',
  })
  const rotateY = gsap.quickTo(card, 'rotationY', {
    duration: 0.5,
    ease: 'power3.out',
  })
  const shineX = shine
    ? gsap.quickTo(shine, 'x', { duration: 0.6, ease: 'power3.out' })
    : null
  const shineY = shine
    ? gsap.quickTo(shine, 'y', { duration: 0.6, ease: 'power3.out' })
    : null

  const onMove = (event: MouseEvent) => {
    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    rotateY(x * 22)
    rotateX(-y * 22)
    shineX?.(x * 70)
    shineY?.(y * 70)
  }

  const onLeave = () => {
    rotateX(0)
    rotateY(0)
    shineX?.(0)
    shineY?.(0)
  }

  root.addEventListener('mousemove', onMove)
  root.addEventListener('mouseleave', onLeave)

  const timeline = gsap.timeline({ paused: true })

  timeline.from(card, {
    opacity: 0,
    scale: 0.92,
    y: 24,
    duration: 0.7,
    ease: 'power3.out',
  })

  if (shine) {
    timeline.from(shine, { opacity: 0, duration: 0.9 }, '-=0.4')
  }

  return {
    mode: 'timeline',
    timeline,
    onKill: () => {
      root.removeEventListener('mousemove', onMove)
      root.removeEventListener('mouseleave', onLeave)
    },
  }
}

export const imageGallery: SceneBuilder = ({ root }) => {
  const cards = qa<HTMLElement>(root, '[data-gallery-card]')

  if (cards.length === 0) return emptyTimeline()

  const total = cards.length

  cards.forEach((card, index) => {
    gsap.set(card, {
      zIndex: total - index,
      transformOrigin: '50% 85%',
    })
  })

  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0.5,
    defaults: { ease: 'power3.out' },
  })

  timeline.to(cards, {
    x: (index) => (index - (total - 1) / 2) * 54,
    y: (index) => Math.abs(index - (total - 1) / 2) * 14,
    rotation: (index) => (index - (total - 1) / 2) * 10,
    scale: (index) => 1 - Math.abs(index - (total - 1) / 2) * 0.04,
    duration: 0.9,
    stagger: 0.05,
  })

  return { mode: 'timeline', timeline }
}

export const imageKenBurns: SceneBuilder = ({ root }) => {
  const panel = q<HTMLElement>(root, '[data-kenburns-panel]')

  if (!panel) return emptyTimeline()

  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    yoyo: true,
    defaults: { ease: 'sine.inOut' },
  })

  timeline.fromTo(
    panel,
    { scale: 1.02, xPercent: 0, yPercent: 0 },
    { scale: 1.22, xPercent: -3, yPercent: -2, duration: 6 },
  )

  return { mode: 'timeline', timeline }
}
