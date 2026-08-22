import type { ComponentProps } from 'react'
import { cn } from '../../lib/utils'

export function Spinner({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      className={cn('size-4 animate-spin', className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" />
    </svg>
  )
}
