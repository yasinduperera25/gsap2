import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { Flip } from 'gsap/Flip'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(
  ScrollTrigger,
  Draggable,
  MotionPathPlugin,
  Flip,
  MorphSVGPlugin,
  InertiaPlugin,
  SplitText,
  DrawSVGPlugin,
)

gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
})

ScrollTrigger.config({
  ignoreMobileResize: true,
})

export {
  gsap,
  ScrollTrigger,
  Draggable,
  MotionPathPlugin,
  Flip,
  MorphSVGPlugin,
  InertiaPlugin,
  SplitText,
  DrawSVGPlugin,
}
