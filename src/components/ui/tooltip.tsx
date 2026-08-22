import { Tooltip as TooltipPrimitive } from '@base-ui-components/react/tooltip'
import { motion } from 'framer-motion'
import { createContext, useContext, useRef, type ComponentProps, type RefObject } from 'react'
import { cn } from '../../lib/utils'

// Base UI's own CSS-transition presence timing doesn't know how to wait on
// a JS-driven animation, so we opt out of it with actionsRef: the popup
// stays mounted after closing until we call unmount() ourselves, once
// framer-motion's exit animation actually finishes.
const TooltipActionsContext = createContext<RefObject<TooltipPrimitive.Root.Actions | null> | null>(null)

function TooltipProvider({ delay = 0, ...props }: ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delay={delay} {...props} />
}

function Tooltip({ ...props }: ComponentProps<typeof TooltipPrimitive.Root>) {
  const actionsRef = useRef<TooltipPrimitive.Root.Actions>(null)

  return (
    <TooltipActionsContext.Provider value={actionsRef}>
      <TooltipProvider>
        <TooltipPrimitive.Root
          actionsRef={actionsRef as RefObject<TooltipPrimitive.Root.Actions>}
          data-slot="tooltip"
          {...props}
        />
      </TooltipProvider>
    </TooltipActionsContext.Provider>
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
  const actionsRef = useContext(TooltipActionsContext)

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner sideOffset={sideOffset}>
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          render={(popupProps, state) => (
            // Base UI's computed props type overlaps framer-motion's custom
            // event-prop signatures (onAnimation*, onDrag*, ...) enough that
            // spreading them typed is more trouble than it's worth — the
            // props themselves (aria-*, id, style, children) are fine at
            // runtime, only the TS shapes clash.
            <motion.div
              {...(popupProps as Record<string, unknown>)}
              initial={{ opacity: 0, scale: 0.92, y: 4 }}
              animate={state.open ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 4 }}
              transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => {
                if (!state.open) actionsRef?.current?.unmount()
              }}
            />
          )}
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
