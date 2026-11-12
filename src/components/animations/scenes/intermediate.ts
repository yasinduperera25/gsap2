import { Draggable, ScrollTrigger, SplitText, gsap } from '@/lib/gsap'
import { emptyTimeline, q, qa, type SceneBuilder } from './helpers'

export const timelineSequencing: SceneBuilder = ({ root }) => {
  const cards = qa(root, '[data-card]')
  const timeline = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.out', duration: 0.7 },
  })

  timeline
    .addLabel('intro')
    .from(cards, { y: 60, opacity: 0, stagger: 0.15 })
    .addLabel('focus')
    .to(cards[1], { y: -16, scale: 1.08, duration: 0.6 }, 'focus')
    .to(
      cards,
      {
        backgroundColor: '#c6ff4a',
        color: '#071008',
        stagger: 0.08,
        duration: 0.4,
      },
      'focus+=0.2',
    )
    .to(
      cards,
      {
        backgroundColor: '#141c31',
        color: '#e9eef8',
        y: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.5,
      },
      '>-0.2',
    )

  return { mode: 'timeline', timeline }
}

export const scrollTriggerBasic: SceneBuilder = ({ root, stage }) => {
  const sections = qa(root, '[data-scroll-section]')

  sections.forEach((section) => {
    const content = q<HTMLElement>(section, '[data-scroll-content]')
    if (!content) return

    gsap.from(content, {
      y: 60,
      opacity: 0,
      scrollTrigger: {
        scroller: stage,
        trigger: section,
        start: 'top 85%',
        end: 'top 45%',
        scrub: true,
      },
    })
  })

  return { mode: 'scroll' }
}

export const scrollReveal: SceneBuilder = ({ root, stage }) => {
  const grid = q<HTMLElement>(root, '.reveal-grid')
  const cards = qa(root, '[data-reveal-card]')

  if (grid) {
    gsap.from(cards, {
      y: 50,
      opacity: 0,
      scale: 0.9,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        scroller: stage,
        trigger: grid,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    })
  }

  return { mode: 'scroll' }
}

export const pinningSections: SceneBuilder = ({ root, stage }) => {
  const panel = q<HTMLElement>(root, '[data-pin-panel]')
  const items = qa(root, '[data-pin-item]')

  if (panel) {
    const timeline = gsap.timeline({
      scrollTrigger: {
        scroller: stage,
        trigger: panel,
        start: 'top top',
        end: '+=420',
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
      },
    })

    timeline.to(items, {
      x: 56,
      backgroundColor: 'rgba(198,255,74,0.12)',
      borderColor: 'rgba(198,255,74,0.32)',
      stagger: 0.18,
      duration: 1,
    })
  }

  return { mode: 'scroll' }
}

export const horizontalScrolling: SceneBuilder = ({ root, stage }) => {
  const section = q<HTMLElement>(root, '[data-horizontal-section]')
  const track = q<HTMLElement>(root, '[data-horizontal-track]')

  if (!section || !track) return { mode: 'scroll' }

  const distance = Math.max(0, track.scrollWidth - stage.clientWidth + 48)
  section.style.height = `${stage.clientHeight + distance + 180}px`

  gsap.to(track, {
    x: -distance,
    ease: 'none',
    scrollTrigger: {
      scroller: stage,
      trigger: section,
      start: 'top top',
      end: () => '+=' + distance,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })

  return { mode: 'scroll' }
}

export const textReveal: SceneBuilder = ({ root }) => {
  const heading = q<HTMLElement>(root, '[data-text-reveal]')
  const sub = q<HTMLElement>(root, '[data-text-sub]')

  if (!heading) return emptyTimeline()

  const split = new SplitText(heading, { type: 'chars,words' })
  const timeline = gsap.timeline({ paused: true })

  timeline.from(split.chars, {
    yPercent: 120,
    opacity: 0,
    rotation: 8,
    duration: 0.8,
    ease: 'back.out(1.4)',
    stagger: 0.03,
  })

  if (sub) {
    timeline.from(sub, { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
  }

  return {
    mode: 'timeline',
    timeline,
    onKill: () => split.revert(),
  }
}

export const imageReveal: SceneBuilder = ({ root }) => {
  const panel = q<HTMLElement>(root, '.image-panel')
  const overlay = q<HTMLElement>(root, '.image-overlay')
  const label = q<HTMLElement>(root, '.image-label')

  if (!panel) return emptyTimeline()

  const timeline = gsap.timeline({ paused: true })

  timeline.fromTo(
    panel,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.1,
      ease: 'power4.inOut',
    },
  )

  if (overlay) {
    timeline.fromTo(
      overlay,
      { yPercent: 0 },
      { yPercent: -100, duration: 1, ease: 'power4.inOut' },
      0,
    )
  }

  if (label) {
    timeline.from(label, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
  }

  timeline.to(
    panel,
    { scale: 1.04, duration: 1.2, ease: 'power2.out' },
    '-=0.5',
  )

  return { mode: 'timeline', timeline }
}

export const parallaxEffects: SceneBuilder = ({ root }) => {
  const layers = qa(root, '[data-parallax-layer]')

  const setters = layers.map((layer) => ({
    depth: Number(layer.dataset.depth ?? 1),
    x: gsap.quickTo(layer, 'x', { duration: 0.8, ease: 'power3.out' }),
    y: gsap.quickTo(layer, 'y', { duration: 0.8, ease: 'power3.out' }),
  }))

  const onMove = (event: MouseEvent) => {
    const rect = root.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    setters.forEach((layer) => {
      layer.x(x * layer.depth * 60)
      layer.y(y * layer.depth * 60)
    })
  }

  const onLeave = () => {
    setters.forEach((layer) => {
      layer.x(0)
      layer.y(0)
    })
  }

  root.addEventListener('mousemove', onMove)
  root.addEventListener('mouseleave', onLeave)

  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    yoyo: true,
  })

  timeline.to(layers, {
    rotation: 3,
    duration: 2,
    stagger: 0.2,
    ease: 'sine.inOut',
  })

  return {
    mode: 'timeline',
    timeline,
    onKill: () => {
      root.removeEventListener('mousemove', onMove)
      root.removeEventListener('mouseleave', onLeave)
    },
  }
}

export const svgAnimations: SceneBuilder = ({ root }) => {
  const path = q<SVGPathElement>(root, '[data-svg-path]')
  const rings = qa<SVGCircleElement>(root, '.svg-ring')
  const dot = q<SVGCircleElement>(root, '[data-svg-dot]')

  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    repeatDelay: 0.4,
  })

  if (path) {
    timeline.fromTo(
      path,
      { drawSVG: '0%' },
      { drawSVG: '100%', duration: 1.6, ease: 'power2.inOut' },
    )
  }

  timeline.to(
    rings,
    {
      rotation: 360,
      transformOrigin: '50% 50%',
      duration: 2.4,
      stagger: 0.2,
      ease: 'none',
    },
    0,
  )

  if (dot) {
    timeline.fromTo(
      dot,
      { scale: 0 },
      { scale: 1, duration: 0.6, ease: 'back.out(2)' },
      0.6,
    )
  }

  return { mode: 'timeline', timeline }
}

export const draggableElements: SceneBuilder = ({ root }) => {
  const tokens = qa(root, '[data-drag-token]')
  const bounds = q<HTMLElement>(root, '[data-drag-bounds]')

  if (!bounds || tokens.length === 0) return emptyTimeline()

  const draggables = Draggable.create(tokens, {
    bounds,
    inertia: true,
    edgeResistance: 0.65,
    cursor: 'grab',
    activeCursor: 'grabbing',
  })

  const timeline = gsap.timeline({
    paused: true,
    repeat: 1,
    yoyo: true,
  })

  timeline.to(tokens, {
    scale: 1.08,
    rotation: 6,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power2.out',
  })

  return {
    mode: 'timeline',
    timeline,
    onKill: () => {
      draggables.forEach((draggable) => draggable.kill())
    },
  }
}

export const batchAnimations: SceneBuilder = ({ root, stage }) => {
  const tiles = qa(root, '[data-grid-tile]')

  gsap.set(tiles, { opacity: 0, y: 30, scale: 0.9 })

  ScrollTrigger.batch(tiles, {
    scroller: stage,
    start: 'top 88%',
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.6,
        overwrite: true,
      }),
    onLeaveBack: (batch) =>
      gsap.to(batch, {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.3,
        overwrite: true,
      }),
  })

  return { mode: 'scroll' }
}

export const scrubAnimations: SceneBuilder = ({ root, stage }) => {
  const progress = q<HTMLElement>(root, '[data-scrub-progress]')
  const boxes = qa(root, '[data-scrub-box]')
  const heading = q<HTMLElement>(root, '[data-scrub-heading]')

  const timeline = gsap.timeline({
    scrollTrigger: {
      scroller: stage,
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    },
  })

  if (progress) {
    timeline.to(progress, { scaleX: 1, ease: 'none' }, 0)
  }

  timeline.to(
    boxes,
    {
      x: (index) => index * 18,
      rotation: 180,
      backgroundColor: '#c6ff4a',
      color: '#071008',
      stagger: 0.1,
    },
    0,
  )

  if (heading) {
    timeline.to(heading, { y: -30, opacity: 0.25 }, 0)
  }

  return { mode: 'scroll' }
}
