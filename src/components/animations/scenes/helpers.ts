import { gsap } from '@/lib/gsap'
import type { AnimationExample, SceneHandle } from '@/types'

export interface SceneContext {
  example: AnimationExample
  root: HTMLElement
  stage: HTMLElement
}

export type SceneBuilder = (context: SceneContext) => SceneHandle

export function q<T extends Element = HTMLElement>(
  root: ParentNode,
  selector: string,
): T | null {
  return root.querySelector<T>(selector)
}

export function qa<T extends Element = HTMLElement>(
  root: ParentNode,
  selector: string,
): T[] {
  return Array.from(root.querySelectorAll<T>(selector))
}

export function requireElement<T extends Element = HTMLElement>(
  root: ParentNode,
  selector: string,
): T {
  const element = q<T>(root, selector)

  if (!element) {
    throw new Error(`Animation scene is missing "${selector}"`)
  }

  return element
}

export function emptyTimeline(): SceneHandle {
  return {
    mode: 'timeline',
    timeline: gsap.timeline({ paused: true }),
  }
}
