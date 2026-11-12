import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { AnimationCard } from '@/components/animations/AnimationCard'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { exampleById, examples, featuredExampleIds } from '@/data/examples'

export function FeaturedSection() {
  const featured = featuredExampleIds
    .map((id) => exampleById.get(id))
    .filter((example) => example !== undefined)

  return (
    <section className="border-b border-white/6 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured"
          title={
            <>
              Start with these
              <br />
              <span className="gradient-text-soft">three moments.</span>
            </>
          }
          description="A tween, a text reveal and a motion path. Each preview is live — press play, pause or restart and watch the code come to life."
          action={
            <Link to="/beginner" className={buttonStyles('secondary', 'md')}>
              See all {examples.length}
              <ArrowRight size={14} />
            </Link>
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featured.map((example) => (
            <AnimationCard key={example.id} example={example} compact />
          ))}
        </div>
      </div>
    </section>
  )
}
