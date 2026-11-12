import * as advanced from './advanced'
import * as beginner from './beginner'
import * as intermediate from './intermediate'
import * as showcase from './showcase'
import type { SceneBuilder } from './helpers'

const sceneBuilders: Record<string, SceneBuilder> = {
  'basic-tween': beginner.basicTween,
  'gsap-to': beginner.gsapTo,
  'gsap-from': beginner.gsapFrom,
  'gsap-fromto': beginner.gsapFromTo,
  'duration-delay': beginner.durationDelay,
  'easing-functions': beginner.easingFunctions,
  'stagger-animations': beginner.staggerAnimations,
  'timeline-animations': beginner.timelineAnimations,
  'hover-animations': beginner.hoverAnimations,
  'click-animations': beginner.clickAnimations,
  'timeline-sequencing': intermediate.timelineSequencing,
  'scrolltrigger-basic': intermediate.scrollTriggerBasic,
  'scroll-reveal': intermediate.scrollReveal,
  'pinning-sections': intermediate.pinningSections,
  'horizontal-scrolling': intermediate.horizontalScrolling,
  'text-reveal': intermediate.textReveal,
  'image-reveal': intermediate.imageReveal,
  'parallax-effects': intermediate.parallaxEffects,
  'svg-animations': intermediate.svgAnimations,
  'draggable-elements': intermediate.draggableElements,
  'batch-animations': intermediate.batchAnimations,
  'scrub-animations': intermediate.scrubAnimations,
  'advanced-timelines': advanced.advancedTimelines,
  'scroll-driven': advanced.scrollDriven,
  'motion-path': advanced.motionPath,
  'flip-animations': advanced.flipAnimations,
  'morphing-animations': advanced.morphingAnimations,
  'complex-stagger': advanced.complexStagger,
  'responsive-animations': advanced.responsiveAnimations,
  'reusable-functions': advanced.reusableFunctions,
  'text-typewriter': showcase.textTypewriter,
  'text-marquee': showcase.textMarquee,
  'carousel-slides': showcase.carouselSlides,
  'carousel-draggable': showcase.carouselDrag,
  'page-transition': showcase.pageTransition,
  'image-tilt': showcase.imageTilt,
  'image-gallery': showcase.imageGallery,
  'image-kenburns': showcase.imageKenBurns,
}

export function getSceneBuilder(id: string): SceneBuilder {
  return sceneBuilders[id] ?? beginner.basicTween
}
