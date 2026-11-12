export type LevelSlug = 'beginner' | 'intermediate' | 'advanced'

export type ExampleCategory =
  | 'Basics'
  | 'Tween'
  | 'Timing'
  | 'Easing'
  | 'Stagger'
  | 'Timeline'
  | 'Interaction'
  | 'ScrollTrigger'
  | 'Text'
  | 'Image'
  | 'Carousel'
  | 'Transition'
  | 'SVG'
  | 'Draggable'
  | 'Advanced'
  | 'Responsive'

export type SceneKind =
  | 'boxes'
  | 'rows'
  | 'cards'
  | 'text'
  | 'image'
  | 'svg'
  | 'parallax'
  | 'draggable'
  | 'grid'
  | 'flip'
  | 'morph'
  | 'path'
  | 'scroll-sections'
  | 'scroll-reveal'
  | 'scroll-pin'
  | 'scroll-horizontal'
  | 'scroll-batch'
  | 'scroll-scrub'
  | 'scroll-driven'
  | 'text-typewriter'
  | 'text-marquee'
  | 'text-scramble'
  | 'text-lines'
  | 'text-gradient'
  | 'carousel'
  | 'carousel-drag'
  | 'carousel-coverflow'
  | 'carousel-vertical'
  | 'page-transition'
  | 'page-transition-slide'
  | 'page-transition-zoom'
  | 'image-tilt'
  | 'image-gallery'
  | 'image-kenburns'
  | 'image-hover-follow'
  | 'image-compare'
  | 'scroll-progress'
  | 'scroll-velocity'
  | 'scroll-parallax-gallery'

export type InteractionKind = 'hover' | 'click' | 'drag' | 'scroll'

export interface AnimationExample {
  id: string
  order: number
  title: string
  summary: string
  explanation: string
  tip: string
  level: LevelSlug
  categories: ExampleCategory[]
  scene: SceneKind
  accent: string
  code: string
  interaction?: InteractionKind
}

export interface SceneHandle {
  mode: 'timeline' | 'scroll'
  timeline?: gsap.core.Timeline
  scrollTrigger?: ScrollTrigger
  onPlay?: () => void
  onPause?: () => void
  onRestart?: () => void
  onKill?: () => void
}

export interface PlaygroundSettings {
  duration: number
  delay: number
  stagger: number
  speed: number
  ease: string
  x: number
  y: number
  rotation: number
  scale: number
}
