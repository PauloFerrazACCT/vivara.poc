import { sendAnalyticsEvent } from '@faststore/sdk'
import { useCallback } from 'react'

type TSendAnalytics = {
  name: 'promo_view'
  params: {
    id: string
    name: string
    position: string
  }
}

type TPromoView = {
  alt?: string
  page?: string
}

/**
 * @export
 * @description send event promoView
 * @param {string} alt indentifier to params
 * @param {string} page indentifier of position
 * @returns void
 */

export const useEventPromoView = ({ alt, page }: TPromoView) => {
  const sendPromoView = useCallback(() => {
    if (!alt || !page) {
      return
    }

    sendAnalyticsEvent<TSendAnalytics>({
      name: 'promo_view',
      params: {
        id: alt,
        name: alt,
        position: page,
      },
    })
  }, [alt, page])

  return { sendPromoView }
}
