import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import {
  Pause,
  Play,
  RotateCcw,
  Shuffle,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react'
import { CodeBlock } from '@/components/code/CodeBlock'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { Select } from '@/components/ui/Select'
import { Slider } from '@/components/ui/Slider'
import { gsap } from '@/lib/gsap'
import type { PlaygroundSettings } from '@/types'
import { cn } from '@/utils/cn'

const defaults: PlaygroundSettings = {
  duration: 1.2,
  delay: 0.1,
  stagger: 0.1,
  speed: 1,
  ease: 'power3.out',
  x: 140,
  y: -40,
  rotation: 180,
  scale: 1.15,
}

const easeOptions = [
  { value: 'power1.out', label: 'power1.out' },
  { value: 'power2.out', label: 'power2.out' },
  { value: 'power3.out', label: 'power3.out' },
  { value: 'power4.inOut', label: 'power4.inOut' },
  { value: 'back.out(1.7)', label: 'back.out(1.7)' },
  { value: 'elastic.out(1, 0.4)', label: 'elastic.out(1, 0.4)' },
  { value: 'bounce.out', label: 'bounce.out' },
  { value: 'sine.inOut', label: 'sine.inOut' },
  { value: 'none', label: 'none (linear)' },
]

const accents = ['#c6ff4a', '#22d3ee', '#8b5cf6', '#f472b6', '#fbbf24']

function randomSettings(): PlaygroundSettings {
  return {
    duration: Number((0.4 + Math.random() * 2.2).toFixed(1)),
    delay: Number((Math.random() * 0.8).toFixed(1)),
    stagger: Number((Math.random() * 0.24).toFixed(2)),
    speed: [0.5, 0.75, 1, 1.25, 1.5, 2][Math.floor(Math.random() * 6)],
    ease: easeOptions[Math.floor(Math.random() * (easeOptions.length - 1))].value,
    x: Math.round(-140 + Math.random() * 280),
    y: Math.round(-100 + Math.random() * 200),
    rotation: Math.round(-360 + Math.random() * 720),
    scale: Number((0.7 + Math.random() * 1).toFixed(2)),
  }
}

export function PlaygroundPage() {
  const scopeRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const playingRef = useRef(false)
  const [settings, setSettings] = useState<PlaygroundSettings>(defaults)
  const [playing, setPlaying] = useState(false)

  const update = <K extends keyof PlaygroundSettings>(
    key: K,
    value: PlaygroundSettings[K],
  ) => {
    setSettings((current) => ({ ...current, [key]: value }))
  }

  useGSAP(
    () => {
      if (!scopeRef.current) return

      const boxes = gsap.utils.toArray<HTMLElement>(
        '[data-playground-box]',
        scopeRef.current,
      )
      const previous = timelineRef.current
      const progress = previous ? previous.progress() : 0.35
      const wasPlaying = playingRef.current

      previous?.kill()

      gsap.set(boxes, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        backgroundColor: '#141c31',
        color: '#c7d0e0',
      })

      const timeline = gsap.timeline({
        paused: true,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.35,
        defaults: {
          ease: settings.ease,
          duration: settings.duration,
          delay: settings.delay,
        },
      })

      timeline.to(boxes, {
        x: settings.x,
        y: settings.y,
        rotation: settings.rotation,
        scale: settings.scale,
        backgroundColor: '#c6ff4a',
        color: '#071008',
        stagger: settings.stagger,
      })

      timeline.timeScale(settings.speed)
      timelineRef.current = timeline

      if (wasPlaying) {
        timeline.play(progress * timeline.duration())
      } else {
        timeline.progress(progress).pause()
      }

      return () => {
        timeline.kill()
      }
    },
    { scope: scopeRef, dependencies: [settings], revertOnUpdate: true },
  )

  const play = () => {
    playingRef.current = true
    setPlaying(true)
    timelineRef.current?.restart()
  }

  const pause = () => {
    playingRef.current = false
    setPlaying(false)
    timelineRef.current?.pause()
  }

  const restart = () => {
    playingRef.current = true
    setPlaying(true)
    timelineRef.current?.restart()
  }

  const randomize = () => {
    setSettings(randomSettings())
  }

  const reset = () => {
    playingRef.current = false
    setPlaying(false)
    setSettings(defaults)
  }

  const code = `const tl = gsap.timeline({
  repeat: -1,
  yoyo: true,
  defaults: {
    ease: "${settings.ease}",
    duration: ${settings.duration},
    delay: ${settings.delay}
  }
});

tl.to(".playground-box", {
  x: ${settings.x},
  y: ${settings.y},
  rotation: ${settings.rotation},
  scale: ${settings.scale},
  stagger: ${settings.stagger}
});

tl.timeScale(${settings.speed});`

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="max-w-3xl">
        <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
          <span className="h-px w-6 bg-accent/50" />
          Interactive playground
        </div>
        <h1 className="text-4xl font-semibold leading-[0.98] text-ink-50 sm:text-5xl">
          Shape the motion.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-400 sm:text-base">
          Drag a control and the preview updates instantly. Tune duration, easing,
          position, rotation and scale, then copy the generated timeline into your
          own project.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-white/8 bg-ink-900/50">
            <div className="flex items-center justify-between gap-3 border-b border-white/6 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  {playing && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  )}
                  <span
                    className={cn(
                      'relative inline-flex h-2 w-2 rounded-full',
                      playing ? 'bg-accent' : 'bg-ink-500',
                    )}
                  />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-500">
                  playground preview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[9px] text-ink-400">
                  {settings.speed}x
                </span>
                <span
                  className="max-w-[140px] truncate rounded-full border border-accent/20 bg-accent/[0.06] px-2.5 py-1 font-mono text-[9px] text-accent"
                  title={settings.ease}
                >
                  {settings.ease}
                </span>
              </div>
            </div>

            <div
              ref={scopeRef}
              className="relative h-[340px] overflow-hidden sm:h-[380px]"
              style={{
                background:
                  'radial-gradient(circle at 50% 10%, rgba(198,255,74,0.07), transparent 55%), #070b14',
              }}
            >
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="absolute inset-x-6 top-1/2 h-px bg-white/[0.04]" />
              <div className="absolute inset-y-6 left-1/2 w-px bg-white/[0.04]" />

              <div className="relative flex h-full items-center justify-center">
                <div className="flex items-center justify-center gap-2.5 sm:gap-3.5">
                  {accents.map((accent, index) => (
                    <div
                      key={accent}
                      data-playground-box
                      className="playground-box flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-ink-750 font-mono text-[10px] font-semibold text-ink-300 shadow-lg sm:h-14 sm:w-14"
                      style={{
                        boxShadow: `0 14px 34px rgba(0,0,0,0.4), 0 0 24px ${accent}14`,
                      }}
                    >
                      0{index + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/8 bg-ink-950/70 px-3 py-1.5 backdrop-blur-md">
                <Sparkles size={11} className="text-accent" />
                <span className="text-[9px] uppercase tracking-[0.18em] text-ink-400">
                  live updates
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/6 px-5 py-4">
              <div className="flex items-center gap-2 text-[10px] text-ink-500">
                <span className={cn('h-1.5 w-1.5 rounded-full', playing ? 'bg-accent' : 'bg-ink-600')} />
                {playing ? 'Playing' : 'Paused at preview frame'}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={play}
                  className={buttonStyles('primary', 'sm', 'h-9')}
                >
                  <Play size={12} fill="currentColor" />
                  Play
                </button>
                <button
                  type="button"
                  onClick={pause}
                  className={buttonStyles('secondary', 'sm', 'h-9')}
                >
                  <Pause size={12} />
                  Pause
                </button>
                <button
                  type="button"
                  onClick={restart}
                  className={buttonStyles('secondary', 'sm', 'h-9')}
                >
                  <RotateCcw size={12} />
                  Restart
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink-100">
                Generated timeline
              </h2>
              <span className="text-[10px] uppercase tracking-[0.18em] text-ink-500">
                updates live
              </span>
            </div>
            <CodeBlock code={code} />
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20">
          <div className="rounded-3xl border border-white/8 bg-ink-900/60 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent/20 bg-accent/[0.06] text-accent">
                  <SlidersHorizontal size={14} />
                </span>
                <div>
                  <h2 className="font-display text-sm font-semibold text-ink-100">
                    Tween controls
                  </h2>
                  <p className="text-[10px] text-ink-500">Everything is live</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={randomize}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/8 bg-white/[0.03] text-ink-400 transition-colors hover:border-white/15 hover:text-accent"
                  aria-label="Randomize settings"
                  title="Randomize"
                >
                  <Shuffle size={13} />
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/8 bg-white/[0.03] text-ink-400 transition-colors hover:border-white/15 hover:text-ink-100"
                  aria-label="Reset settings"
                  title="Reset"
                >
                  <RotateCcw size={13} />
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <Select
                label="Easing"
                value={settings.ease}
                onChange={(event) => update('ease', event.target.value)}
                options={easeOptions}
              />

              <div className="grid grid-cols-2 gap-4">
                <Slider
                  label="Duration"
                  value={settings.duration}
                  min={0.2}
                  max={3}
                  step={0.1}
                  suffix="s"
                  onChange={(value) => update('duration', value)}
                />
                <Slider
                  label="Delay"
                  value={settings.delay}
                  min={0}
                  max={1.5}
                  step={0.1}
                  suffix="s"
                  onChange={(value) => update('delay', value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Slider
                  label="Stagger"
                  value={settings.stagger}
                  min={0}
                  max={0.4}
                  step={0.01}
                  suffix="s"
                  onChange={(value) => update('stagger', value)}
                />
                <Slider
                  label="Speed"
                  value={settings.speed}
                  min={0.25}
                  max={3}
                  step={0.25}
                  suffix="x"
                  onChange={(value) => update('speed', value)}
                />
              </div>

              <div className="h-px bg-white/6" />

              <div className="grid grid-cols-2 gap-4">
                <Slider
                  label="X position"
                  value={settings.x}
                  min={-160}
                  max={160}
                  step={1}
                  suffix="px"
                  onChange={(value) => update('x', value)}
                />
                <Slider
                  label="Y position"
                  value={settings.y}
                  min={-120}
                  max={120}
                  step={1}
                  suffix="px"
                  onChange={(value) => update('y', value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Slider
                  label="Rotation"
                  value={settings.rotation}
                  min={-360}
                  max={360}
                  step={1}
                  suffix="°"
                  onChange={(value) => update('rotation', value)}
                />
                <Slider
                  label="Scale"
                  value={settings.scale}
                  min={0.5}
                  max={1.8}
                  step={0.05}
                  suffix="x"
                  onChange={(value) => update('scale', value)}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan/12 bg-cyan/[0.035] p-4">
            <p className="text-[11px] leading-relaxed text-ink-400">
              <span className="font-semibold text-cyan">Try this.</span> Set easing to{' '}
              <code className="font-mono text-cyan">elastic.out(1, 0.4)</code>, scale
              to <code className="font-mono text-cyan">1.4</code> and stagger to{' '}
              <code className="font-mono text-cyan">0.18</code> for a springy cascade.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
