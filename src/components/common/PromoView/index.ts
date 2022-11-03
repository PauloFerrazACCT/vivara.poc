import { useCallback } from 'react'
import { useEventPromoView } from 'src/hooks/usePromoView'

interface Props {
  altForEvent: string
  identifier: string
}
const EVENT_NAME = 'promoView'

export const PromoView = ({ altForEvent, identifier }: Props) => {
  const { sendPromoView } = useEventPromoView({
    alt: altForEvent,
    page: identifier,
  })

  const AddPromoView = useCallback(() => {
    if (typeof window === 'undefined' || !window) {
      return null
    }

    const hasEvent = window.dataLayer.some(
      (item) => item?.event === EVENT_NAME && item?.ecommerce.id === altForEvent
    )

    return altForEvent && !hasEvent && sendPromoView()
  }, [altForEvent, sendPromoView])

  return { AddPromoView }
}
