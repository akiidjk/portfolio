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
      <TooltipPrimitive.Positioner
        sideOffset={sideOffset}
        // Defaults to the nearest scrollable ancestor (the graph's own
        // overflow-x-auto strip), which leaves no room to flip for cells
        // near its edge — widen it to the whole document instead.
        collisionBoundary={typeof document === 'undefined' ? undefined : document.documentElement}
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            'z-50 w-fit origin-(--transform-origin) border border-hairline bg-panel-black px-3 py-1.5 font-mono text-fs-10 text-balance text-phosphor-white transition-[opacity,transform] duration-150 ease-out data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
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
