import { CTA } from '@/components/home/CTA'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { FeaturedSection } from '@/components/home/FeaturedSection'
import { Hero } from '@/components/home/Hero'
import { IntroSection } from '@/components/home/IntroSection'
import { StatsSection } from '@/components/home/StatsSection'

export function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <IntroSection />
      <CategoryGrid />
      <FeaturedSection />
      <CTA />
    </>
  )
}
