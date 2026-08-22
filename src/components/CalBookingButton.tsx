import { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

const CAL_NAMESPACE = '30min'
const CAL_LINK = 'akiidjk/30min'

export function CalBookingButton({ className }: { className?: string }) {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout: 'month_view',
        styles: { branding: { brandColor: '#c7ff2e' } },
      })
    })()
  }, [])

  return (
    <button
      type="button"
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config={JSON.stringify({ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' })}
      className={className}
    >
      BOOK A CALL ↗
    </button>
  )
}
