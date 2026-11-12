import { Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { AboutPage } from '@/pages/AboutPage'
import { ExampleDetailPage } from '@/pages/ExampleDetailPage'
import { ExamplesPage } from '@/pages/ExamplesPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PlaygroundPage } from '@/pages/PlaygroundPage'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route
          path="beginner"
          element={
            <ExamplesPage
              eyebrow="Beginner track"
              title="Learn the core, one tween at a time."
              description="Ten focused examples covering the building blocks of GSAP: from a single property tween to nested timelines and staggered grids."
              level="beginner"
            />
          }
        />
        <Route
          path="intermediate"
          element={
            <ExamplesPage
              eyebrow="Intermediate track"
              title="Connect motion to interaction."
              description="Twelve examples that add scroll, drag, SVG and sequencing to the core API. This is where animation starts to feel like part of the interface."
              level="intermediate"
            />
          }
        />
        <Route
          path="advanced"
          element={
            <ExamplesPage
              eyebrow="Advanced track"
              title="Build systems, not one-off effects."
              description="Eight examples covering motion paths, layout transitions, shape morphing, responsive timelines and reusable animation architecture."
              level="advanced"
            />
          }
        />
        <Route
          path="scrolltrigger"
          element={
            <ExamplesPage
              eyebrow="ScrollTrigger"
              title="Scroll is the timeline."
              description="A focused collection of scroll-driven techniques: reveals, pinning, horizontal sections, batch reveals and scrubbed scenes."
              filterCategory="ScrollTrigger"
            />
          }
        />
        <Route path="examples/:id" element={<ExampleDetailPage />} />
        <Route path="playground" element={<PlaygroundPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
