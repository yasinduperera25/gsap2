import type { LevelSlug } from '@/types'

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function levelLabel(level: LevelSlug) {
  return capitalize(level)
}

export function padIndex(value: number) {
  return String(value).padStart(2, '0')
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
