import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-ink-950 hover:bg-accent-bright shadow-[0_0_0_1px_rgba(198,255,74,0.25),0_12px_40px_rgba(198,255,74,0.16)] hover:shadow-[0_0_0_1px_rgba(198,255,74,0.4),0_16px_50px_rgba(198,255,74,0.24)]',
  secondary:
    'bg-ink-800/80 text-ink-100 border border-white/10 hover:border-white/20 hover:bg-ink-750',
  ghost: 'text-ink-300 hover:text-ink-100 hover:bg-white/[0.06]',
  outline:
    'border border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-sm gap-2.5',
  icon: 'h-9 w-9 p-0',
}

export function buttonStyles(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
) {
  return cn(
    'inline-flex select-none items-center justify-center rounded-xl font-medium transition-all duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40',
    variants[variant],
    sizes[size],
    className,
  )
}
