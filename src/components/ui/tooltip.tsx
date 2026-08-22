import { Tooltip as TooltipPrimitive } from '@base-ui-components/react/tooltip'
import type { ComponentProps } from 'react'
import { cn } from '../../lib/utils'

function TooltipProvider({ delay = 0, ...props }: ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delay={delay} {...props} />
}

function Tooltip({ ...props }: ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger(props: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 8,
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Popup> & { sideOffset?: number }) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner sideOffset={sideOffset}>
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            'z-50 w-fit text-balance border border-hairline bg-panel-black px-3 py-1.5 font-mono text-fs-10 text-phosphor-white',
            className,
          )}
          {...props}
        >
          {children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
