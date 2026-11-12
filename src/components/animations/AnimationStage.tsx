import { useCallback, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { ScrollTrigger, gsap } from '@/lib/gsap'
import type { AnimationExample, SceneHandle } from '@/types'
import { cn } from '@/utils/cn'
import { SceneMarkup } from './SceneMarkup'
import { getSceneBuilder } from './scenes'

interface AnimationStageProps {
  example: AnimationExample
  compact?: boolean
  className?: string
}

const interactionLabels: Record<string, string> = {
  hover: 'hover',
  click: 'click',
  drag: 'drag',
  scroll: 'scroll',
}

export function AnimationStage({ example, compact, className }: AnimationStageProps) {
  const scopeRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const handleRef = useRef<SceneHandle | null>(null)
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null)
  const [playing, setPlaying] = useState(false)

  const isScroll = example.interaction === 'scroll'

  const play = useCallback(() => {
    const handle = handleRef.current
    if (!handle) return

    handle.onPlay?.()

    if (handle.mode === 'scroll' && viewportRef.current) {
      const viewport = viewportRef.current
      const maxScroll = viewport.scrollHeight - viewport.clientHeight

      if (maxScroll <= 4) return
      if (viewport.scrollTop >= maxScroll - 4) viewport.scrollTop = 0

      scrollTweenRef.current?.kill()
      scrollTweenRef.current = gsap.to(viewport, {
        scrollTop: maxScroll,
        duration: Math.max(2.6, maxScroll / 180),
        ease: 'none',
        onComplete: () => setPlaying(false),
      })

      handle.scrollTrigger?.enable()
    } else if (handle.timeline) {
      if (handle.timeline.progress() === 1) {
        handle.timeline.restart()
      } else {
        handle.timeline.play()
      }
    }

    setPlaying(true)
  }, [])

  const pause = useCallback(() => {
    const handle = handleRef.current
    handle?.onPause?.()
    handle?.timeline?.pause()
    scrollTweenRef.current?.pause()
    setPlaying(false)
  }, [])

  const restart = useCallback(() => {
    const handle = handleRef.current
    if (!handle) return

    handle.onRestart?.()
    scrollTweenRef.current?.kill()
    scrollTweenRef.current = null

    if (viewportRef.current) {
      viewportRef.current.scrollTop = 0
    }

    if (handle.mode === 'scroll') {
      ScrollTrigger.refresh()
      window.requestAnimationFrame(() => play())
    } else {
      handle.timeline?.restart()
      setPlaying(true)
    }
  }, [play])

  useGSAP(
    () => {
      if (!scopeRef.current || !viewportRef.current || !sceneRef.current) return

      const handle = getSceneBuilder(example.id)({
        example,
        root: sceneRef.current,
        stage: viewportRef.current,
      })

      handleRef.current = handle
      handle.timeline?.eventCallback('onComplete', () => setPlaying(false))
      handle.timeline?.eventCallback('onReverseComplete', () => setPlaying(false))

      const updateProgress = () => {
        const current = handleRef.current
        const bar = progressRef.current
        if (!current || !bar) return

        let progress = 0

        if (current.mode === 'scroll' && viewportRef.current) {
          const maxScroll =
            viewportRef.current.scrollHeight - viewportRef.current.clientHeight
          progress = maxScroll > 0 ? viewportRef.current.scrollTop / maxScroll : 0
        } else if (current.timeline) {
          progress = current.timeline.progress()
        }

        bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`
      }

      gsap.ticker.add(updateProgress)

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting) && handle.mode === 'timeline') {
            observer.disconnect()
            play()
          }
        },
        { threshold: 0.35 },
      )

      observer.observe(scopeRef.current)

      return () => {
        observer.disconnect()
        gsap.ticker.remove(updateProgress)
        scrollTweenRef.current?.kill()
        scrollTweenRef.current = null
        handle.onKill?.()
        handleRef.current = null
      }
    },
    { scope: scopeRef, dependencies: [example.id, play], revertOnUpdate: true },
  )

  return (
    <div
      ref={scopeRef}
      className={cn(
        'overflow-hidden rounded-2xl border border-white/8 bg-[#070b14]',
        className,
      )}
      style={{
        background: `radial-gradient(circle at 50% 0%, ${example.accent}10, transparent 58%), #070b14`,
      }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/6 px-4 py-2.5">
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
            live preview
          </span>
        </div>
        <div className="flex items-center gap-2">
          {example.interaction && (
            <span className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-400">
              {interactionLabels[example.interaction]}
            </span>
          )}
          <span className="font-mono text-[9px] text-ink-600">
            {String(example.order).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={cn(
          'stage-viewport',
          isScroll && 'stage-viewport--scroll stage-scroll',
          compact ? (isScroll ? 'h-[280px]' : 'h-[250px]') : isScroll ? 'h-[360px]' : 'h-[330px]',
        )}
      >
        <div
          ref={sceneRef}
          className={cn(
            'relative',
            isScroll ? 'min-h-full' : 'flex h-full items-center justify-center',
          )}
        >
          <SceneMarkup example={example} />
        </div>
      </div>

      <div className="h-px bg-white/5">
        <span
          ref={progressRef}
          className="block h-px origin-left scale-x-0 bg-gradient-to-r from-accent via-cyan to-violet"
        />
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-1.5 text-[10px] text-ink-500">
          <span className={cn('h-1.5 w-1.5 rounded-full', playing ? 'bg-accent' : 'bg-ink-600')} />
          {playing ? 'Playing' : isScroll ? 'Scroll or press play' : 'Paused'}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={play}
            className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-ink-950 transition-transform hover:scale-105 active:scale-95"
            aria-label="Play animation"
            title="Play"
          >
            <Play size={13} fill="currentColor" />
          </button>
          <button
            type="button"
            onClick={pause}
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/8 bg-white/[0.03] text-ink-300 transition-colors hover:border-white/15 hover:text-ink-50"
            aria-label="Pause animation"
            title="Pause"
          >
            <Pause size={13} />
          </button>
          <button
            type="button"
            onClick={restart}
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/8 bg-white/[0.03] text-ink-300 transition-colors hover:border-white/15 hover:text-ink-50"
            aria-label="Restart animation"
            title="Restart"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}
