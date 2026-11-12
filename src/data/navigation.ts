import type { ComponentType } from 'react'
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
        badge: '10',
      },
      {
        label: 'Intermediate Animations',
        to: '/intermediate',
        icon: Layers,
        badge: '12',
      },
      {
        label: 'Advanced Animations',
        to: '/advanced',
        icon: Rocket,
        badge: '8',
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
        badge: '8',
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
