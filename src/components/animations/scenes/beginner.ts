import { gsap } from '@/lib/gsap'
import { emptyTimeline, q, qa, type SceneBuilder } from './helpers'

export const basicTween: SceneBuilder = ({ root }) => {
  const boxes = qa(root, '[data-box]')
  const timeline = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.inOut' },
  })

  timeline.to(boxes, {
    x: 52,
    rotation: 360,
    scale: 1.15,
    backgroundColor: '#c6ff4a',
    color: '#071008',
    stagger: 0.08,
    duration: 1.1,
    yoyo: true,
    repeat: 1,
    repeatDelay: 0.15,
  })

  return { mode: 'timeline', timeline }
}

export const gsapTo: SceneBuilder = ({ root }) => {
  const boxes = qa(root, '[data-box]')
  const timeline = gsap.timeline({ paused: true })

  timeline.to(boxes, {
    x: 64,
    borderRadius: '50%',
    backgroundColor: '#22d3ee',
    color: '#041318',
    rotation: 180,
    duration: 1.1,
    stagger: 0.1,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut',
  })

  return { mode: 'timeline', timeline }
}

export const gsapFrom: SceneBuilder = ({ root }) => {
  const boxes = qa(root, '[data-box]')
  const timeline = gsap.timeline({ paused: true })

  timeline.from(boxes, {
    x: -120,
    opacity: 0,
    rotation: -180,
    scale: 0.4,
    duration: 0.9,
    ease: 'back.out(1.7)',
    stagger: 0.08,
  })

  return { mode: 'timeline', timeline }
}

export const gsapFromTo: SceneBuilder = ({ root }) => {
  const boxes = qa(root, '[data-box]')
  const timeline = gsap.timeline({ paused: true })

  timeline.fromTo(
    boxes,
    { x: -70, y: 40, rotation: -45, opacity: 0.2 },
    {
      x: 70,
      y: -20,
      rotation: 45,
      opacity: 1,
      duration: 1.1,
      ease: 'power3.inOut',
      stagger: 0.1,
      yoyo: true,
      repeat: 1,
    },
  )

  return { mode: 'timeline', timeline }
}

export const durationDelay: SceneBuilder = ({ root }) => {
  const boxes = qa(root, '[data-box]')
  const timeline = gsap.timeline({ paused: true })

  boxes.forEach((box, index) => {
    timeline.to(
      box,
      {
        x: 38 + index * 10,
        rotation: (index + 1) * 30,
        duration: 0.4 + index * 0.3,
        delay: index * 0.08,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      },
      0,
    )
  })

  return { mode: 'timeline', timeline }
}

export const easingFunctions: SceneBuilder = ({ root }) => {
  const rows = qa(root, '[data-ease-row]')
  const timeline = gsap.timeline({ paused: true })

  rows.forEach((row) => {
    const track = q<HTMLElement>(row, '[data-ease-track]')
    const dot = q<HTMLElement>(row, '[data-ease-dot]')
    const ease = row.getAttribute('data-ease') ?? 'power2.out'

    if (!track || !dot) return

    timeline.fromTo(
      dot,
      { x: 0 },
      {
        x: () => track.clientWidth - dot.offsetWidth - 8,
        duration: 1.4,
        ease,
        repeat: 1,
        yoyo: true,
      },
      0,
    )
  })

  return { mode: 'timeline', timeline }
}

export const staggerAnimations: SceneBuilder = ({ root }) => {
  const boxes = qa(root, '[data-box]')
  const timeline = gsap.timeline({ paused: true })

  timeline.from(boxes, {
    y: 60,
    opacity: 0,
    scale: 0.6,
    duration: 0.8,
    ease: 'back.out(1.7)',
    stagger: {
      each: 0.12,
      from: 'center',
    },
  })

  return { mode: 'timeline', timeline }
}

export const timelineAnimations: SceneBuilder = ({ root }) => {
  const boxes = qa(root, '[data-box]')
  const timeline = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.out' },
  })

  if (boxes.length < 5) return { mode: 'timeline', timeline }

  timeline
    .to(boxes[0], {
      x: 70,
      rotation: 180,
      backgroundColor: '#c6ff4a',
      color: '#071008',
      duration: 0.7,
    })
    .to(
      boxes[1],
      {
        y: -54,
        scale: 1.2,
        backgroundColor: '#22d3ee',
        color: '#041318',
        duration: 0.7,
      },
      '-=0.3',
    )
    .to(
      boxes[2],
      {
        x: -70,
        rotation: -180,
        backgroundColor: '#8b5cf6',
        duration: 0.7,
      },
      '<',
    )
    .to(
      boxes[3],
      {
        y: 54,
        scale: 0.8,
        backgroundColor: '#f472b6',
        duration: 0.7,
      },
      '-=0.2',
    )
    .to(
      boxes,
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        backgroundColor: '#1a243d',
        color: '#c7d0e0',
        stagger: 0.05,
        duration: 0.7,
      },
      '+=0.35',
    )

  return { mode: 'timeline', timeline }
}

export const hoverAnimations: SceneBuilder = ({ root }) => {
  const target = q<HTMLElement>(root, '.hover-target')
  const glow = q<HTMLElement>(root, '.hover-glow')

  if (!target || !glow) return emptyTimeline()

  target.setAttribute('tabindex', '0')
  target.setAttribute('role', 'button')

  const timeline = gsap.timeline({ paused: true })

  timeline
    .to(
      target,
      {
        y: -10,
        scale: 1.04,
        boxShadow: '0 30px 80px rgba(198,255,74,0.25)',
        duration: 0.45,
        ease: 'power2.out',
      },
      0,
    )
    .to(glow, { scale: 1.6, opacity: 0.5, duration: 0.45 }, 0)

  const enter = () => {
    timeline.play()
  }
  const leave = () => {
    timeline.reverse()
  }

  target.addEventListener('mouseenter', enter)
  target.addEventListener('mouseleave', leave)
  target.addEventListener('focusin', enter)
  target.addEventListener('focusout', leave)

  return {
    mode: 'timeline',
    timeline,
    onKill: () => {
      target.removeEventListener('mouseenter', enter)
      target.removeEventListener('mouseleave', leave)
      target.removeEventListener('focusin', enter)
      target.removeEventListener('focusout', leave)
    },
  }
}

export const clickAnimations: SceneBuilder = ({ root }) => {
  const target = q<HTMLElement>(root, '.click-target')
  const badge = q<HTMLElement>(root, '[data-click-badge]')

  if (!target) return emptyTimeline()

  let clicks = 0

  const onClick = () => {
    clicks += 1
    if (badge) badge.textContent = String(clicks)

    gsap.fromTo(
      target,
      { scale: 0.92 },
      {
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      },
    )

    gsap.to(target, {
      rotation: '+=25',
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  target.addEventListener('click', onClick)

  const timeline = gsap.timeline({
    paused: true,
    repeat: -1,
    repeatDelay: 1.2,
  })

  timeline.to(target, {
    scale: 1.1,
    rotation: 6,
    duration: 0.5,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut',
  })

  return {
    mode: 'timeline',
    timeline,
    onKill: () => {
      target.removeEventListener('click', onClick)
    },
  }
}
