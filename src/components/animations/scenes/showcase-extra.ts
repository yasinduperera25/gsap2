import { Draggable, ScrollTrigger, SplitText, gsap } from '@/lib/gsap'
import { emptyTimeline, q, qa, type SceneBuilder } from './helpers'

const scrambleCharacters = '!<>-_\\/[]{}—=+*^?#'

export const scrollProgress: SceneBuilder = ({ root, stage }) => {
  const bar = q<HTMLElement>(root, '[data-scroll-progress-bar]')
  const number = q<HTMLElement>(root, '[data-scroll-progress-number]')
  const cards = qa<HTMLElement>(root, '[data-scroll-progress-card]')
  const counter = { value: 0 }

  if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })

  const timeline = gsap.timeline({
    scrollTrigger: {
      scroller: stage,
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
    },
  })

  if (bar) {
    timeline.to(bar, { scaleX: 1, duration: 2.6, ease: 'none' }, 0)
  }

  if (number) {
    timeline.to(
      counter,
      {
        value: 100,
        duration: 2.6,
        ease: 'none',
        snap: { value: 1 },
        onUpdate: () => {
          number.textContent = String(Math.round(counter.value)).padStart(2, '0')
        },
      },
      0,
    )
  }

  cards.forEach((card, index) => {
    timeline.fromTo(
      card,
      { y: 44, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      0.2 + index * 0.42,
    )
  })

  return { mode: 'scroll' }
}

export const scrollVelocity: SceneBuilder = ({ root, stage }) => {
  const rows = qa<HTMLElement>(root, '[data-velocity-row]')

  if (rows.length === 0) return { mode: 'scroll' }

  const clamp = gsap.utils.clamp(-12, 12)
  const setters = rows.map((row) =>
    gsap.quickTo(row, 'skewY', { duration: 0.35, ease: 'power3.out' }),
  )
  let reset: gsap.core.Tween | null = null

  ScrollTrigger.create({
    scroller: stage,
    trigger: root,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const velocity = clamp(self.getVelocity() / -260)

      setters.forEach((setter, index) => setter(velocity * (1 + index * 0.16)))
      reset?.kill()
      reset = gsap.to(
        {},
        {
          duration: 0.18,
          onComplete: () => setters.forEach((setter) => setter(0)),
        },
      )
    },
  })

  return { mode: 'scroll', onKill: () => reset?.kill() }
}

export const scrollParallaxGallery: SceneBuilder = ({ root, stage }) => {
  const columns = qa<HTMLElement>(root, '[data-scroll-column]')

  columns.forEach((column) => {
    const speed = Number(column.dataset.speed ?? 1)

    gsap.fromTo(
      column,
      { y: 40 * speed },
      {
        y: -70 * speed,
        ease: 'none',
        scrollTrigger: {
          scroller: stage,
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      },
    )
  })

  return { mode: 'scroll' }
}

export const textScramble: SceneBuilder = ({ root }) => {
  const text = q<HTMLElement>(root, '[data-scramble-text]')
  const sub = q<HTMLElement>(root, '[data-scramble-sub]')

  if (!text) return emptyTimeline()

  const final = text.textContent ?? ''
  const state = { progress: 0 }

  const render = () => {
    const revealed = Math.floor(state.progress * final.length)
    let output = ''

    for (let index = 0; index < final.length; index += 1) {
      const character = final[index]

      if (index < revealed || character === ' ') {
        output += character
      } else {
        output += scrambleCharacters[Math.floor(Math.random() * scrambleCharacters.length)]
      }
    }

    text.textContent = output
  }

  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    repeatDelay: 1.3,
    onRepeat: () => {
      state.progress = 0
      render()
    },
  })

  timeline.to(state, {
    progress: 1,
    duration: 2.2,
    ease: 'none',
    onUpdate: render,
  })

  if (sub) {
    timeline.fromTo(
      sub,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0,
    )
  }

  timeline.to({}, { duration: 0.8 })

  return { mode: 'timeline', timeline }
}

export const textLineReveal: SceneBuilder = ({ root }) => {
  const heading = q<HTMLElement>(root, '[data-lines-text]')
  const sub = q<HTMLElement>(root, '[data-lines-sub]')

  if (!heading) return emptyTimeline()

  const split = new SplitText(heading, { type: 'lines', linesClass: 'split-line' })
  const timeline = gsap.timeline({ paused: true })

  timeline.from(split.lines, {
    yPercent: 120,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power4.out',
  })

  if (sub) {
    timeline.from(
      sub,
      { y: 16, opacity: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.35',
    )
  }

  return {
    mode: 'timeline',
    timeline,
    onKill: () => split.revert(),
  }
}

export const textGradientSweep: SceneBuilder = ({ root }) => {
  const text = q<HTMLElement>(root, '[data-gradient-text]')

  if (!text) return emptyTimeline()

  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    yoyo: true,
    defaults: { ease: 'sine.inOut' },
  })

  timeline.fromTo(
    text,
    { backgroundPosition: '0% 50%' },
    { backgroundPosition: '200% 50%', duration: 2.4 },
  )

  return { mode: 'timeline', timeline }
}

export const pageTransitionSlide: SceneBuilder = ({ root }) => {
  const track = q<HTMLElement>(root, '[data-pt-slide-track]')
  const panels = qa<HTMLElement>(root, '[data-pt-slide-panel]')

  if (!track || panels.length < 2) return emptyTimeline()

  const timeline = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.5 })

  for (let index = 1; index < panels.length; index += 1) {
    timeline.to(track, {
      xPercent: -100 * index,
      duration: 0.75,
      ease: 'power3.inOut',
    })
  }

  timeline.to({}, { duration: 1 })
  timeline.to(track, { xPercent: 0, duration: 0.75, ease: 'power3.inOut' })

  return {
    mode: 'timeline',
    timeline,
    onRestart: () => gsap.set(track, { xPercent: 0 }),
  }
}

export const pageTransitionZoom: SceneBuilder = ({ root }) => {
  const pages = qa<HTMLElement>(root, '[data-pt-zoom-page]')

  if (pages.length < 2) return emptyTimeline()

  const reset = () => {
    gsap.set(pages[0], { opacity: 1, scale: 1, filter: 'blur(0px)' })
    gsap.set(pages[1], { opacity: 0, scale: 1.12, filter: 'blur(14px)' })
  }

  reset()

  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    repeatDelay: 0.6,
    defaults: { ease: 'power3.inOut' },
  })

  timeline
    .to(pages[0], { opacity: 0, scale: 0.86, filter: 'blur(14px)', duration: 0.7 })
    .to(
      pages[1],
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.7 },
      '<',
    )
    .to({}, { duration: 1 })
    .to(pages[0], { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.7 })
    .to(
      pages[1],
      { opacity: 0, scale: 1.12, filter: 'blur(14px)', duration: 0.7 },
      '<',
    )
    .to({}, { duration: 0.7 })

  return { mode: 'timeline', timeline, onRestart: reset }
}

export const carouselCoverflow: SceneBuilder = ({ root }) => {
  const cards = qa<HTMLElement>(root, '[data-coverflow-card]')
  const dots = qa<HTMLElement>(root, '[data-coverflow-dot]')

  if (cards.length < 2) return emptyTimeline()

  const total = cards.length
  let active = 0

  const setDots = () => {
    dots.forEach((dot, index) => {
      const current = index === active

      dot.style.opacity = current ? '1' : '0.35'
      dot.style.width = current ? '20px' : '8px'
    })
  }

  const layout = (duration: number) => {
    cards.forEach((card, index) => {
      let offset = (index - active + total) % total

      if (offset > total / 2) offset -= total

      const distance = Math.abs(offset)

      gsap.to(card, {
        x: offset * 86,
        scale: 1 - distance * 0.14,
        rotationY: offset * -22,
        opacity: distance > 2 ? 0 : 1,
        zIndex: total - distance,
        duration,
        ease: 'power3.inOut',
      })
    })
  }

  gsap.set(cards, { transformOrigin: '50% 50%' })
  layout(0)
  setDots()

  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    repeatDelay: 0.6,
    onRepeat: () => {
      active = (active + 1) % total
      layout(0.7)
      setDots()
    },
  })

  timeline.to({}, { duration: 1.2 })

  return { mode: 'timeline', timeline }
}

export const carouselVertical: SceneBuilder = ({ root }) => {
  const viewport = q<HTMLElement>(root, '[data-vertical-window]')
  const track = q<HTMLElement>(root, '[data-vertical-track]')
  const slides = qa<HTMLElement>(root, '[data-vertical-slide]')
  const dots = qa<HTMLElement>(root, '[data-vertical-dot]')

  if (!viewport || !track || slides.length < 2) return emptyTimeline()

  const setActive = (active: number) => {
    dots.forEach((dot, index) => {
      const current = index === active

      dot.style.opacity = current ? '1' : '0.3'
      dot.style.transform = current ? 'scaleY(2.4)' : 'scaleY(1)'
    })
  }

  setActive(0)

  const timeline = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.6 })

  for (let index = 1; index < slides.length; index += 1) {
    timeline.to(track, {
      y: () => -index * viewport.clientHeight,
      duration: 0.7,
      ease: 'power3.inOut',
      onStart: () => setActive(index),
    })
  }

  timeline.to({}, { duration: 1 })
  timeline.to(track, {
    y: 0,
    duration: 0.7,
    ease: 'power3.inOut',
    onStart: () => setActive(0),
  })

  return {
    mode: 'timeline',
    timeline,
    onRestart: () => {
      gsap.set(track, { y: 0 })
      setActive(0)
    },
  }
}

export const imageHoverFollow: SceneBuilder = ({ root }) => {
  const preview = q<HTMLElement>(root, '[data-hover-preview]')
  const items = qa<HTMLElement>(root, '[data-hover-item]')

  if (!preview || items.length === 0) return emptyTimeline()

  const xTo = gsap.quickTo(preview, 'x', { duration: 0.5, ease: 'power3.out' })
  const yTo = gsap.quickTo(preview, 'y', { duration: 0.5, ease: 'power3.out' })

  const show = (item: HTMLElement) => {
    const itemRect = item.getBoundingClientRect()
    const rootRect = root.getBoundingClientRect()

    if (item.dataset.gradient) {
      preview.style.background = item.dataset.gradient
    }

    xTo(itemRect.left - rootRect.left + itemRect.width / 2)
    yTo(itemRect.top - rootRect.top + itemRect.height / 2)
    gsap.to(preview, { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' })
  }

  const hide = () => {
    gsap.to(preview, { opacity: 0, scale: 0.85, duration: 0.3, ease: 'power2.out' })
  }

  const onMove = (event: MouseEvent) => {
    const rect = root.getBoundingClientRect()

    xTo(event.clientX - rect.left)
    yTo(event.clientY - rect.top)
  }

  const enterHandlers = items.map((item) => () => show(item))

  enterHandlers.forEach((handler, index) => {
    items[index].addEventListener('mouseenter', handler)
  })
  items.forEach((item) => item.addEventListener('mouseleave', hide))
  root.addEventListener('mousemove', onMove)

  gsap.set(preview, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.85 })

  const timeline = gsap.timeline({ paused: true })

  timeline.from(items, {
    y: 24,
    opacity: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power3.out',
  })

  return {
    mode: 'timeline',
    timeline,
    onKill: () => {
      enterHandlers.forEach((handler, index) => {
        items[index].removeEventListener('mouseenter', handler)
      })
      items.forEach((item) => item.removeEventListener('mouseleave', hide))
      root.removeEventListener('mousemove', onMove)
    },
  }
}

export const imageCompare: SceneBuilder = ({ root }) => {
  const frame = q<HTMLElement>(root, '[data-compare-frame]')
  const top = q<HTMLElement>(root, '[data-compare-top]')
  const handle = q<HTMLElement>(root, '[data-compare-handle]')

  if (!frame || !top || !handle) return emptyTimeline()

  const width = frame.clientWidth || 1

  const update = () => {
    const x = Number(gsap.getProperty(handle, 'x')) || 0
    const percent = gsap.utils.clamp(0, 100, (x / width) * 100)

    top.style.clipPath = `inset(0 ${100 - percent}% 0 0)`
  }

  gsap.set(handle, { x: width * 0.5 })
  update()

  const draggables = Draggable.create(handle, {
    type: 'x',
    bounds: { minX: 0, maxX: width },
    onDrag: update,
    onThrowUpdate: update,
    cursor: 'grab',
    activeCursor: 'grabbing',
  })

  const timeline = gsap.timeline({ paused: true })

  timeline.from(frame, {
    opacity: 0,
    scale: 0.96,
    duration: 0.6,
    ease: 'power3.out',
  })
  timeline.from(
    handle,
    { x: 0, duration: 0.9, ease: 'power3.inOut', onUpdate: update },
    '-=0.3',
  )

  return {
    mode: 'timeline',
    timeline,
    onKill: () => {
      draggables.forEach((draggable) => draggable.kill())
    },
  }
}
