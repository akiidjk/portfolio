import { useMediaQuery } from './useMediaQuery'

export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 640px)')
}

export function useIsTablet(): boolean {
  return useMediaQuery('(max-width: 1024px)')
}

/** True on devices with a real mouse (hover-capable, fine pointer) — false on touch. */
export function useHasFinePointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}
