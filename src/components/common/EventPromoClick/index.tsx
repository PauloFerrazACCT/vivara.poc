export const EventPromoClick = (alt?: string, page?: string) => {
  if (!alt?.length) {
    return
  }

  const promoClick = {
    name: 'AnalyticsEvent',
    params: {
      name: 'store:promo_click',
      params: {
        id: alt,
        name: alt,
        position: page,
      },
    },
  }

  window.postMessage(promoClick)
}
