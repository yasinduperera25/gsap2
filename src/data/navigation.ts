import type { ComponentType } from 'react'
import { examplesByLevel, scrollExamples } from '@/data/examples'
import {
  LayoutDashboard,
  Sparkles,
  Layers,
  Rocket,
  ScrollText,
  SlidersHorizontal,
  Info,
} from 'lucide-react'

export interface NavItem {
  label: string
  to: string
  icon: ComponentType<{ className?: string; size?: number }>
  exact?: boolean
  badge?: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navSections: NavSection[] = [
  {
    title: 'Workspace',
    items: [
      {
        label: 'Overview',
        to: '/',
        icon: LayoutDashboard,
        exact: true,
      },
    ],
  },
  {
    title: 'Learn',
    items: [
      {
        label: 'Beginner Animations',
        to: '/beginner',
        icon: Sparkles,
        badge: String(examplesByLevel.beginner.length),
      },
      {
        label: 'Intermediate Animations',
        to: '/intermediate',
        icon: Layers,
        badge: String(examplesByLevel.intermediate.length),
      },
      {
        label: 'Advanced Animations',
        to: '/advanced',
        icon: Rocket,
        badge: String(examplesByLevel.advanced.length),
      },
    ],
  },
  {
    title: 'Explore',
    items: [
      {
        label: 'ScrollTrigger',
        to: '/scrolltrigger',
        icon: ScrollText,
        badge: String(scrollExamples.length),
      },
      {
        label: 'Interactive Playground',
        to: '/playground',
        icon: SlidersHorizontal,
      },
      {
        label: 'About GSAP',
        to: '/about',
        icon: Info,
      },
    ],
  },
]
