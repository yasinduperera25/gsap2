import { Flip, gsap } from '@/lib/gsap'
import { emptyTimeline, q, qa, type SceneBuilder } from './helpers'

export const advancedTimelines: SceneBuilder = ({ root }) => {
  const cards = qa(root, '[data-card]')
  const timeline = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.out' },
  })

  timeline
    .addLabel('intro')
    .from(cards, {
      y: 60,
      opacity: 0,
      rotationX: -30,
      stagger: 0.12,
      duration: 0.7,
    })
    .addLabel('focus')
    .to(
      cards[1],
      {
        scale: 1.12,
        y: -14,
        duration: 0.6,
      },
      'focus',
    )
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
        scale: 1,
        y: 0,
        backgroundColor: '#141c31',
        color: '#e9eef8',
        stagger: 0.08,
        duration: 0.5,
      },
      '>-0.2',
    )

  return { mode: 'timeline', timeline }
}

export const scrollDriven: SceneBuilder = ({ root, stage }) => {
  const layerOne = q<HTMLElement>(root, '.driven-layer-1')
  const layerTwo = q<HTMLElement>(root, '.driven-layer-2')
  const cards = qa(root, '[data-driven-card]')
  const number = q<HTMLElement>(root, '[data-driven-number]')

  const timeline = gsap.timeline({
    scrollTrigger: {
      scroller: stage,
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    },
  })

  if (layerOne) {
    timeline.to(layerOne, { yPercent: -20, ease: 'none' }, 0)
  }

  if (layerTwo) {
    timeline.to(layerTwo, { yPercent: -50, ease: 'none' }, 0)
  }

  timeline.to(
    cards,
    {
      y: (index) => -index * 40,
      rotation: (index) => (index % 2 ? 8 : -8),
      stagger: 0.1,
    },
    0,
  )

  if (number) {
    timeline.to(number, { scale: 1.4, opacity: 1 }, 0)
  }

  return { mode: 'scroll' }
}

export const motionPath: SceneBuilder = ({ root }) => {
  const path = q<SVGPathElement>(root, '[data-motion-path]')
  const dot = q<SVGGElement>(root, '[data-path-dot]')

  if (!path || !dot) return emptyTimeline()

  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    repeatDelay: 0.5,
  })

  timeline.to(dot, {
    duration: 2.4,
    ease: 'power1.inOut',
    motionPath: {
      path,
      align: path,
      alignOrigin: [0.5, 0.5],
      autoRotate: true,
    },
  })

  return { mode: 'timeline', timeline }
}

export const flipAnimations: SceneBuilder = ({ root }) => {
  const grid = q<HTMLElement>(root, '[data-flip-grid]')
  const tiles = qa(root, '[data-flip-card]')

  if (!grid || tiles.length < 2) return emptyTimeline()

  const originalOrder = Array.from(grid.children)

  const shuffle = () => {
    const state = Flip.getState(tiles)
    const first = grid.firstElementChild

    if (first) grid.appendChild(first)

    Flip.from(state, {
      duration: 0.7,
      ease: 'power2.inOut',
      absolute: true,
      stagger: 0.03,
    })
  }

  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    repeatDelay: 0.8,
    onRepeat: shuffle,
  })

  timeline.call(shuffle, [], 0)
  timeline.to({}, { duration: 1.1 })

  return {
    mode: 'timeline',
    timeline,
    onRestart: () => {
      originalOrder.forEach((element) => grid.appendChild(element))
    },
  }
}

export const morphingAnimations: SceneBuilder = ({ root }) => {
  const path = q<SVGPathElement>(root, '[data-morph-path]')
  const target = path?.getAttribute('data-morph-target')

  if (!path || !target) return emptyTimeline()

  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0.4,
  })

  timeline.to(path, {
    duration: 1.4,
    morphSVG: target,
    ease: 'power2.inOut',
  })

  return { mode: 'timeline', timeline }
}

export const complexStagger: SceneBuilder = ({ root }) => {
  const tiles = qa(root, '[data-grid-tile]')

  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0.3,
  })

  timeline.fromTo(
    tiles,
    { scale: 0.4, opacity: 0.2, rotation: -25 },
    {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.7,
      ease: 'back.out(1.7)',
      stagger: {
        each: 0.04,
        from: 'center',
        grid: 'auto',
      },
    },
  )

  return { mode: 'timeline', timeline }
}

export const responsiveAnimations: SceneBuilder = ({ root }) => {
  const boxes = qa(root, '[data-box]')
  const timeline = gsap.timeline({ paused: true })
  const media = gsap.matchMedia()

  media.add('(min-width: 640px)', () => {
    timeline.to(boxes, {
      x: 60,
      rotation: 180,
      stagger: 0.1,
      duration: 1,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1,
    })
  })

  media.add('(max-width: 639px)', () => {
    timeline.to(boxes, {
      y: -50,
      scale: 1.2,
      stagger: 0.1,
      duration: 1,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1,
    })
  })

  return {
    mode: 'timeline',
    timeline,
    onKill: () => media.revert(),
  }
}

export const reusableFunctions: SceneBuilder = ({ root }) => {
  const boxes = qa(root, '[data-box]')

  const animateBox = (box: HTMLElement, index: number) =>
    gsap.fromTo(
      box,
      { y: 40, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: index % 2 ? 8 : -8,
        duration: 0.8,
        ease: 'back.out(1.7)',
      },
    )

  const timeline = gsap.timeline({ paused: true })

  boxes.forEach((box, index) => {
    timeline.add(animateBox(box, index), index * 0.1)
  })

  return { mode: 'timeline', timeline }
}
