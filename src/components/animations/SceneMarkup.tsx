import type { CSSProperties, ReactNode } from 'react'
import {
  GripVertical,
  Hand,
  Layers,
  MousePointer2,
  MousePointerClick,
  Move,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'
import type { AnimationExample } from '@/types'

const easeRows = [
  { label: 'power1.out', value: 'power1.out' },
  { label: 'power2.out', value: 'power2.out' },
  { label: 'back.out(1.7)', value: 'back.out(1.7)' },
  { label: 'elastic.out', value: 'elastic.out(1, 0.4)' },
  { label: 'bounce.out', value: 'bounce.out' },
]

const durationLabels = ['0.4s', '0.7s', '1.0s', '1.3s', '1.6s']

function BoxesScene({ example }: { example: AnimationExample }) {
  if (example.interaction === 'hover') {
    return (
      <div className="scene-shell">
        <div className="relative flex items-center justify-center">
          <div className="hover-glow absolute h-44 w-44 rounded-full bg-accent/20 blur-3xl" />
          <div className="hover-target relative flex w-60 flex-col items-center gap-3 rounded-3xl border border-white/10 bg-gradient-to-br from-ink-750 to-ink-900 px-6 py-8 text-center shadow-2xl">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
              <MousePointer2 size={20} />
            </span>
            <span className="font-display text-lg font-semibold text-ink-50">
              Hover me
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
              micro-interaction
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (example.interaction === 'click') {
    return (
      <div className="scene-shell">
        <div className="relative flex flex-col items-center gap-5">
          <div className="click-target relative flex w-60 cursor-pointer flex-col items-center gap-3 rounded-3xl border border-white/10 bg-gradient-to-br from-ink-750 to-ink-900 px-6 py-8 text-center shadow-2xl">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-pink/25 bg-pink/10 text-pink">
              <MousePointerClick size={20} />
            </span>
            <span className="font-display text-lg font-semibold text-ink-50">
              Click me
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
              tap to trigger
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-400">
            <span>clicks</span>
            <span
              data-click-badge
              className="rounded-md border border-white/8 bg-ink-900 px-2 py-0.5 font-mono text-accent"
            >
              0
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="scene-shell">
      <div className="relative flex w-full max-w-xl flex-col items-center gap-8">
        <div className="absolute h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
        <div className="relative flex items-center justify-center gap-3 sm:gap-4">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              data-box
              className={`scene-box box box-${index + 1} h-12 w-12 shrink-0 sm:h-14 sm:w-14`}
              style={{
                borderColor: `${example.accent}22`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 0 24px ${example.accent}0d`,
              }}
            >
              {example.id === 'duration-delay'
                ? durationLabels[index]
                : String(index + 1).padStart(2, '0')}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/8 bg-ink-900/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-ink-500">
          <Sparkles size={11} className="text-accent" />
          {example.interaction === 'scroll' ? 'scroll inside the preview' : 'live preview'}
        </div>
      </div>
    </div>
  )
}

function RowsScene() {
  return (
    <div className="scene-shell">
      <div className="w-full max-w-lg space-y-3.5">
        {easeRows.map((row) => (
          <div
            key={row.value}
            data-ease-row
            data-ease={row.value}
            className="flex items-center gap-3"
          >
            <span className="w-24 shrink-0 font-mono text-[10px] text-ink-400 sm:w-28">
              {row.label}
            </span>
            <div
              data-ease-track
              className="relative h-9 flex-1 overflow-hidden rounded-full border border-white/6 bg-white/[0.03]"
            >
              <span
                data-ease-dot
                className="ease-dot absolute left-1 top-1 h-7 w-7 rounded-full border border-accent/30 bg-gradient-to-br from-accent to-cyan shadow-[0_0_18px_rgba(198,255,74,0.25)]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CardsScene() {
  return (
    <div className="scene-shell" style={{ perspective: 900 }}>
      <div className="grid w-full max-w-xl grid-cols-3 gap-3 sm:gap-4">
        {[
          { icon: Zap, title: 'Trigger', lines: ['intent', 'signal'] },
          { icon: Layers, title: 'Sequence', lines: ['order', 'rhythm'] },
          { icon: Sparkles, title: 'Polish', lines: ['ease', 'depth'] },
        ].map((card, index) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              data-card
              className="scene-card seq-card adv-card flex min-h-[150px] flex-col justify-between p-4"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/8 bg-white/[0.03] text-accent">
                  <Icon size={15} />
                </span>
                <span className="font-mono text-[10px] text-ink-500">
                  0{index + 1}
                </span>
              </div>
              <div>
                <div className="font-display text-sm font-semibold text-ink-100">
                  {card.title}
                </div>
                <div className="mt-2 space-y-1.5">
                  {card.lines.map((line) => (
                    <div key={line} className="scene-line w-10/12" />
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TextScene() {
  return (
    <div className="scene-shell">
      <div className="flex w-full max-w-xl flex-col items-center text-center">
        <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-accent">
          <span className="h-px w-6 bg-accent/50" />
          split text
          <span className="h-px w-6 bg-accent/50" />
        </div>
        <div className="split-parent w-full">
          <h3
            data-text-reveal
            className="reveal-heading font-display text-4xl font-semibold leading-[0.95] text-ink-50 sm:text-5xl"
          >
            Make it move.
          </h3>
        </div>
        <p
          data-text-sub
          className="mt-5 max-w-sm text-xs leading-relaxed text-ink-400 sm:text-sm"
        >
          Characters, words and lines become animation primitives. Build
          editorial reveals with precise, readable timing.
        </p>
      </div>
    </div>
  )
}

function ImageScene() {
  return (
    <div className="scene-shell">
      <div
        className="image-panel relative h-[230px] w-full max-w-[320px] overflow-hidden rounded-3xl border border-white/10"
        style={{
          background:
            'radial-gradient(circle at 22% 18%, rgba(198,255,74,0.9), transparent 28%), radial-gradient(circle at 76% 24%, rgba(34,211,238,0.8), transparent 34%), radial-gradient(circle at 54% 80%, rgba(139,92,246,0.9), transparent 42%), linear-gradient(145deg, #162040, #080c16)',
        }}
      >
        <div className="absolute inset-0 dot-bg opacity-40" />
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
            motion / 001
          </span>
        </div>
        <div className="image-label absolute bottom-5 left-5 right-5">
          <div className="font-display text-2xl font-semibold leading-none text-white">
            Depth
            <br />
            in layers.
          </div>
          <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/50">
            clip-path reveal
          </div>
        </div>
        <div className="image-overlay absolute inset-0 bg-ink-950" />
      </div>
    </div>
  )
}

function SvgScene() {
  return (
    <div className="scene-shell">
      <svg
        viewBox="0 0 320 220"
        className="w-full max-w-md overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="svg-line" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#c6ff4a" />
            <stop offset="0.55" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="svg-fill" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#c6ff4a" stopOpacity="0.18" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <circle
          className="svg-ring"
          cx="160"
          cy="110"
          r="78"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <circle
          className="svg-ring"
          cx="160"
          cy="110"
          r="56"
          fill="none"
          stroke="rgba(198,255,74,0.18)"
          strokeWidth="1"
        />
        <path
          className="svg-path"
          data-svg-path
          d="M46 154C78 70 120 170 160 96C196 30 232 150 274 66"
          fill="none"
          stroke="url(#svg-line)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M160 32L178 70L216 76L188 103L195 141L160 122L125 141L132 103L104 76L142 70Z"
          fill="url(#svg-fill)"
          stroke="rgba(198,255,74,0.35)"
          strokeWidth="1"
        />
        <circle
          className="svg-dot"
          data-svg-dot
          cx="274"
          cy="66"
          r="7"
          fill="#c6ff4a"
        />
        <circle cx="46" cy="154" r="4" fill="#22d3ee" />
      </svg>
    </div>
  )
}

function ParallaxScene() {
  return (
    <div className="scene-shell overflow-hidden">
      <div className="parallax-stage relative flex h-[260px] w-full max-w-xl items-center justify-center">
        <div
          data-parallax-layer
          data-depth="0.35"
          className="parallax-layer absolute left-4 top-4 h-28 w-28 rounded-3xl border border-accent/15 bg-accent/[0.06] backdrop-blur-sm"
        />
        <div
          data-parallax-layer
          data-depth="0.6"
          className="parallax-layer absolute bottom-2 left-16 h-20 w-20 rounded-full border border-cyan/20 bg-cyan/[0.08]"
        />
        <div
          data-parallax-layer
          data-depth="0.9"
          className="parallax-layer absolute right-8 top-6 h-24 w-24 rounded-2xl border border-violet/20 bg-violet/[0.08]"
        />
        <div
          data-parallax-layer
          data-depth="1.25"
          className="parallax-layer absolute bottom-6 right-20 h-16 w-16 rotate-12 rounded-xl border border-pink/20 bg-pink/[0.08]"
        />
        <div
          data-parallax-layer
          data-depth="0.15"
          className="parallax-layer relative z-10 flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-ink-900/70 px-8 py-6 backdrop-blur-md"
        >
          <Move size={20} className="text-accent" />
          <span className="font-display text-lg font-semibold text-ink-50">
            Move your cursor
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-ink-400">
            layered depth
          </span>
        </div>
      </div>
    </div>
  )
}

function DraggableScene() {
  return (
    <div className="scene-shell">
      <div
        data-drag-bounds
        className="drag-bounds relative h-[260px] w-full max-w-lg overflow-hidden rounded-3xl border border-dashed border-white/10 bg-white/[0.02]"
      >
        <div className="absolute inset-0 dot-bg opacity-30" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <Hand size={22} className="mx-auto mb-2 text-ink-500" />
          <span className="text-[10px] uppercase tracking-[0.22em] text-ink-500">
            drag within bounds
          </span>
        </div>
        {[
          { left: '12%', top: '18%', color: '#c6ff4a', label: 'A' },
          { left: '62%', top: '24%', color: '#22d3ee', label: 'B' },
          { left: '38%', top: '62%', color: '#8b5cf6', label: 'C' },
        ].map((token) => (
          <div
            key={token.label}
            data-drag-token
            className="drag-token absolute flex h-16 w-16 cursor-grab touch-none select-none flex-col items-center justify-center gap-1 rounded-2xl border bg-ink-800 shadow-xl active:cursor-grabbing"
            style={{
              left: token.left,
              top: token.top,
              borderColor: `${token.color}44`,
              boxShadow: `0 12px 30px rgba(0,0,0,0.35), 0 0 24px ${token.color}18`,
            }}
          >
            <GripVertical size={14} style={{ color: token.color }} />
            <span className="font-mono text-xs font-semibold" style={{ color: token.color }}>
              {token.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GridScene({ scroll = false }: { scroll?: boolean }) {
  return (
    <div className={scroll ? 'w-full px-6 pb-16 pt-10' : 'scene-shell'}>
      {scroll && (
        <div className="mx-auto mb-8 max-w-sm text-center">
          <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-accent">
            scroll to reveal
          </div>
          <h4 className="font-display text-2xl font-semibold text-ink-50">
            Batch reveals
          </h4>
          <p className="mt-3 text-xs leading-relaxed text-ink-400">
            Scroll the preview to trigger each row of tiles.
          </p>
        </div>
      )}
      <div
        className={
          scroll
            ? 'mx-auto grid max-w-sm grid-cols-4 gap-2.5'
            : 'grid w-full max-w-sm grid-cols-4 gap-2.5'
        }
      >
        {Array.from({ length: scroll ? 16 : 12 }).map((_, index) => (
          <div
            key={index}
            data-grid-tile
            className="grid-tile flex aspect-square items-center justify-center rounded-xl border border-white/8 bg-gradient-to-br from-ink-750 to-ink-900 font-mono text-[10px] text-ink-400"
            style={{
              borderColor: index % 5 === 0 ? 'rgba(198,255,74,0.22)' : undefined,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>
        ))}
      </div>
      {scroll && <div className="h-[460px]" />}
    </div>
  )
}

function FlipScene() {
  return (
    <div className="scene-shell">
      <div className="w-full max-w-lg">
        <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-ink-500">
          <span>flip grid</span>
          <span className="flex items-center gap-1.5 text-accent">
            <Star size={10} /> play to shuffle
          </span>
        </div>
        <div data-flip-grid className="flip-grid grid grid-cols-4 gap-2.5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              data-flip-card
              data-flip-id={`flip-${index}`}
              className="flip-card flex aspect-square items-center justify-center rounded-xl border border-white/8 bg-gradient-to-br from-ink-750 to-ink-900 font-mono text-xs font-semibold text-ink-300"
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MorphScene() {
  return (
    <div className="scene-shell">
      <svg viewBox="0 0 320 220" className="w-full max-w-md" aria-hidden="true">
        <defs>
          <linearGradient id="morph-fill" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#c6ff4a" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#22d3ee" stopOpacity="0.75" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.85" />
          </linearGradient>
          <filter id="morph-glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="160" cy="110" r="82" fill="none" stroke="rgba(255,255,255,0.05)" />
        <path
          className="morph-path"
          data-morph-path
          data-morph-target="M160 34C206 34 256 62 256 110C256 158 208 186 160 186C112 186 64 158 64 110C64 62 114 34 160 34Z"
          d="M160 42C204 26 250 58 244 104C238 150 194 188 148 178C102 168 66 128 78 86C90 44 120 56 160 42Z"
          fill="url(#morph-fill)"
          filter="url(#morph-glow)"
        />
        <path
          className="morph-target"
          d="M160 34C206 34 256 62 256 110C256 158 208 186 160 186C112 186 64 158 64 110C64 62 114 34 160 34Z"
          fill="none"
          stroke="none"
        />
      </svg>
    </div>
  )
}

function PathScene() {
  return (
    <div className="scene-shell">
      <svg viewBox="0 0 320 220" className="w-full max-w-md overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="path-line" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#c6ff4a" />
            <stop offset="0.5" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <path
          className="motion-path"
          data-motion-path
          d="M32 176C70 176 64 54 112 54C160 54 138 164 190 164C242 164 224 66 288 66"
          fill="none"
          stroke="url(#path-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="3 7"
        />
        <circle cx="32" cy="176" r="4" fill="#c6ff4a" />
        <circle cx="288" cy="66" r="4" fill="#8b5cf6" />
        <g data-path-dot>
          <circle r="12" fill="#c6ff4a" fillOpacity="0.16" />
          <circle r="6" fill="#c6ff4a" />
          <path d="M0 -17L5 -8L-5 -8Z" fill="#c6ff4a" />
        </g>
        <text x="42" y="198" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="monospace">
          MOTION PATH
        </text>
      </svg>
    </div>
  )
}

function ScrollSectionsScene() {
  return (
    <div className="w-full px-6 pb-20 pt-8">
      <div className="mx-auto max-w-sm text-center">
        <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-accent">
          scrolltrigger
        </div>
        <h4 className="font-display text-2xl font-semibold text-ink-50">
          Scroll to animate
        </h4>
        <p className="mt-3 text-xs leading-relaxed text-ink-400">
          Each section has its own trigger and scrub setting.
        </p>
      </div>
      <div className="mt-10 space-y-5">
        {[
          { number: '01', title: 'Enter', copy: 'The trigger starts when the section enters the viewport.' },
          { number: '02', title: 'Scrub', copy: 'Progress is tied directly to scroll position.' },
          { number: '03', title: 'Leave', copy: 'The timeline completes as the section exits.' },
        ].map((section) => (
          <div
            key={section.number}
            data-scroll-section
            className="scroll-section mx-auto max-w-sm"
          >
            <div
              data-scroll-content
              className="scroll-content rounded-2xl border border-white/8 bg-gradient-to-br from-ink-750 to-ink-900 p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] text-accent">{section.number}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </div>
              <h5 className="font-display text-lg font-semibold text-ink-50">
                {section.title}
              </h5>
              <p className="mt-2 text-xs leading-relaxed text-ink-400">{section.copy}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-40" />
    </div>
  )
}

function ScrollRevealScene() {
  return (
    <div className="w-full px-6 pb-20 pt-8">
      <div className="mx-auto max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-violet">
            reveal on enter
          </div>
          <h4 className="font-display text-2xl font-semibold text-ink-50">
            Cards in motion
          </h4>
        </div>
        <div className="reveal-grid grid grid-cols-2 gap-3">
          {['Intent', 'Rhythm', 'Depth', 'Polish'].map((label, index) => (
            <div
              key={label}
              data-reveal-card
              className="reveal-card rounded-2xl border border-white/8 bg-gradient-to-br from-ink-750 to-ink-900 p-4"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[10px] text-violet">
                  0{index + 1}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-violet/70" />
              </div>
              <div className="font-display text-sm font-semibold text-ink-100">{label}</div>
              <div className="mt-2 h-1 w-2/3 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
        <div className="h-[520px]" />
      </div>
    </div>
  )
}

function ScrollPinScene() {
  return (
    <div className="w-full">
      <div className="h-[90px]" />
      <div
        data-pin-panel
        className="pin-section mx-auto w-[calc(100%-40px)] max-w-sm rounded-3xl border border-white/10 bg-gradient-to-br from-ink-750 to-ink-900 p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-pink">
              pinned section
            </div>
            <h4 className="mt-2 font-display text-xl font-semibold text-ink-50">
              Hold the moment
            </h4>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-pink/20 bg-pink/10 text-pink">
            <Zap size={15} />
          </span>
        </div>
        <div className="space-y-3">
          {['Pin the scene', 'Animate the details', 'Release the scroll'].map((item, index) => (
            <div
              key={item}
              data-pin-item
              className="pin-item flex items-center gap-3 rounded-xl border border-white/6 bg-white/[0.025] px-3 py-2.5"
            >
              <span className="font-mono text-[10px] text-ink-500">0{index + 1}</span>
              <span className="text-xs text-ink-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[640px]" />
    </div>
  )
}

function ScrollHorizontalScene() {
  return (
    <div data-horizontal-section className="relative w-full" style={{ minHeight: 900 }}>
      <div className="sticky top-0 flex h-[340px] items-center overflow-hidden">
        <div
          data-horizontal-track
          className="horizontal-track flex w-max items-center gap-3 px-6 will-change-transform"
        >
          {['One', 'Two', 'Three', 'Four', 'Five'].map((label, index) => (
            <div
              key={label}
              className="flex h-48 w-44 shrink-0 flex-col justify-between rounded-2xl border border-white/8 bg-gradient-to-br from-ink-750 to-ink-900 p-4"
            >
              <span className="font-mono text-[10px] text-amber-300">
                0{index + 1}
              </span>
              <div>
                <div className="font-display text-2xl font-semibold text-ink-50">
                  {label}
                </div>
                <div className="mt-2 h-1 w-12 rounded-full bg-amber-300/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ScrollScrubScene() {
  return (
    <div className="w-full px-6 pb-20 pt-8">
      <div className="mx-auto max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-yellow-300">
            scrub
          </div>
          <h4 data-scrub-heading className="scrub-heading font-display text-2xl font-semibold text-ink-50">
            Scroll is the playhead
          </h4>
        </div>
        <div className="mb-6 h-1 overflow-hidden rounded-full bg-white/8">
          <div
            data-scrub-progress
            className="scrub-progress h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-accent to-cyan"
          />
        </div>
        <div className="space-y-3">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              data-scrub-box
              className="scrub-box flex items-center gap-3 rounded-xl border border-white/8 bg-gradient-to-r from-ink-750 to-ink-900 p-3"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-yellow-300/10 font-mono text-[10px] text-yellow-300">
                0{index + 1}
              </span>
              <div className="h-1.5 flex-1 rounded-full bg-white/8" />
            </div>
          ))}
        </div>
        <div className="h-[520px]" />
      </div>
    </div>
  )
}

function ScrollDrivenScene() {
  return (
    <div className="w-full px-6 pb-20 pt-8">
      <div className="mx-auto max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-cyan">
            scroll-driven
          </div>
          <div
            data-driven-number
            className="driven-number font-display text-5xl font-semibold text-cyan opacity-60"
          >
            03
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-400">
            Layered cards move at different rates as the preview scrolls.
          </p>
        </div>
        <div className="relative h-56">
          <div
            data-driven-layer
            className="driven-layer-1 absolute left-2 top-8 h-32 w-24 rounded-2xl border border-cyan/15 bg-cyan/[0.04]"
          />
          <div
            data-driven-layer
            className="driven-layer-2 absolute right-2 top-2 h-24 w-20 rounded-2xl border border-violet/15 bg-violet/[0.04]"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                data-driven-card
                className="driven-card flex h-36 w-20 flex-col justify-between rounded-2xl border border-white/8 bg-gradient-to-b from-ink-750 to-ink-900 p-3"
              >
                <span className="font-mono text-[9px] text-ink-500">0{index + 1}</span>
                <span className="h-8 w-8 rounded-lg border border-cyan/20 bg-cyan/5" />
              </div>
            ))}
          </div>
        </div>
        <div className="h-[620px]" />
      </div>
    </div>
  )
}

export function SceneMarkup({ example }: { example: AnimationExample }) {
  let content: ReactNode

  switch (example.scene) {
    case 'boxes':
      content = <BoxesScene example={example} />
      break
    case 'rows':
      content = <RowsScene />
      break
    case 'cards':
      content = <CardsScene />
      break
    case 'text':
      content = <TextScene />
      break
    case 'image':
      content = <ImageScene />
      break
    case 'svg':
      content = <SvgScene />
      break
    case 'parallax':
      content = <ParallaxScene />
      break
    case 'draggable':
      content = <DraggableScene />
      break
    case 'grid':
      content = <GridScene />
      break
    case 'flip':
      content = <FlipScene />
      break
    case 'morph':
      content = <MorphScene />
      break
    case 'path':
      content = <PathScene />
      break
    case 'scroll-sections':
      content = <ScrollSectionsScene />
      break
    case 'scroll-reveal':
      content = <ScrollRevealScene />
      break
    case 'scroll-pin':
      content = <ScrollPinScene />
      break
    case 'scroll-horizontal':
      content = <ScrollHorizontalScene />
      break
    case 'scroll-batch':
      content = <GridScene scroll />
      break
    case 'scroll-scrub':
      content = <ScrollScrubScene />
      break
    case 'scroll-driven':
      content = <ScrollDrivenScene />
      break
    default:
      content = <BoxesScene example={example} />
  }

  return (
    <div
      className="relative min-h-full w-full"
      style={{ '--example-accent': example.accent } as CSSProperties}
    >
      {content}
    </div>
  )
}
