import type { ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'
import { useClipboard } from '@/hooks/useClipboard'
import { cn } from '@/utils/cn'

const TOKEN_REGEX =
  /(\/\/[^\n]*|"[^"\n]*"|'[^'\n]*'|`[^`]*`|\b(?:const|let|var|function|return|import|from|export|default|new|true|false|null|undefined|if|else|for|of|in|await|async|interface|type|number|string|boolean|void)\b|\b(?:gsap|ScrollTrigger|Draggable|Flip|SplitText|MotionPathPlugin|MorphSVGPlugin|DrawSVGPlugin|InertiaPlugin|useGSAP)\b|\b\d+(?:\.\d+)?\b)/g

const KEYWORDS = new Set([
  'const',
  'let',
  'var',
  'function',
  'return',
  'import',
  'from',
  'export',
  'default',
  'new',
  'true',
  'false',
  'null',
  'undefined',
  'if',
  'else',
  'for',
  'of',
  'in',
  'await',
  'async',
  'interface',
  'type',
  'number',
  'string',
  'boolean',
  'void',
])

const APIS = new Set([
  'gsap',
  'ScrollTrigger',
  'Draggable',
  'Flip',
  'SplitText',
  'MotionPathPlugin',
  'MorphSVGPlugin',
  'DrawSVGPlugin',
  'InertiaPlugin',
  'useGSAP',
])

function tokenClass(token: string) {
  if (token.startsWith('//')) return 'code-token-comment'
  if (/^["'`]/.test(token)) return 'code-token-string'
  if (/^\d/.test(token)) return 'code-token-number'
  if (KEYWORDS.has(token)) return 'code-token-keyword'
  if (APIS.has(token)) return 'code-token-api'
  return 'code-token-plain'
}

function renderLine(line: string, lineIndex: number): ReactNode[] {
  const parts = line.split(TOKEN_REGEX)

  return parts.map((part, index) => {
    if (!part) return null
    return (
      <span key={`${lineIndex}-${index}`} className={tokenClass(part)}>
        {part}
      </span>
    )
  })
}

interface CodeBlockProps {
  code: string
  language?: string
  compact?: boolean
  className?: string
}

export function CodeBlock({
  code,
  language = 'typescript',
  compact,
  className,
}: CodeBlockProps) {
  const { copied, copy } = useClipboard()
  const lines = code.replace(/\n$/, '').split('\n')

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-white/8 bg-[#070b14]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/6 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
            {language}
          </span>
        </div>
        <button
          type="button"
          onClick={() => copy(code)}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors',
            copied
              ? 'border-accent/30 bg-accent/10 text-accent'
              : 'border-white/8 bg-white/[0.03] text-ink-400 hover:border-white/15 hover:text-ink-100',
          )}
          aria-label={copied ? 'Code copied' : 'Copy code'}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className={cn('code-scroll overflow-auto', compact ? 'max-h-[220px]' : 'max-h-[340px]')}>
        <div className="flex min-w-full text-[11.5px] leading-6">
          <div
            aria-hidden="true"
            className="select-none border-r border-white/5 bg-white/[0.015] px-3 py-3 text-right font-mono text-ink-600"
          >
            {lines.map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
          <pre className="min-w-0 flex-1 px-4 py-3">
            <code className="block font-mono">
              {lines.map((line, index) => (
                <div key={index} className="whitespace-pre">
                  {renderLine(line, index)}
                  {line === '' ? ' ' : null}
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}
