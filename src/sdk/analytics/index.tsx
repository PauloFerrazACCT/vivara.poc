import type { AnalyticsEvent } from '@faststore/sdk'
import { useAnalyticsEvent } from '@faststore/sdk'

import storeConfig from '../../../store.config'

if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer ?? []
}

type PageViewEvent = {
  name: 'page_view'
  params: {
    visitorId: string
    pageType: string
    location: string
    page: string
    referrer: string
  }
}

type WishlistProduct = {
  name: 'add_wish_list'
  params: {
    productId: string
    name: string
  }
}

type RemoveWishList = {
  name: 'remove_wish_list'
  params: {
    productId: string
  }
}

type PromoClick = {
  name: 'promo_click'
  params: {
    id: string
    name: string
    position: string
  }
}

type PromoView = {
  name: 'promo_view'
  params: {
    id: string
    name: string
    position: string
  }
}

type TAnalyticsData =
  | PageViewEvent
  | RemoveWishList
  | WishlistProduct
  | PromoClick
  | PromoView

const parseToUniversalAnalyticsData = (
  evt: AnalyticsEvent | TAnalyticsData
) => {
  switch (evt.name) {
    case 'view_item':
      return {
        event: 'productDetail',
        ecommerce: {
          detail: {
            products: (evt.params.items ?? []).map((item) => ({
              brand: item.item_brand,
              category: item.item_category,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              id: item.product_reference_id,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              variant: item.item_variant_name,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name: item.item_name,
              dimension1: '',
              dimension2: '',
              dimension3: '',
              dimension4: '',
              price: item.price,
            })),
          },
        },
      }

    case 'select_item':
      return {
        event: 'productClick',
        ecommerce: {
          click: {
            actionField: { list: evt.params.item_list_name },
            products: (evt.params.items ?? []).map((item) => ({
              brand: item.item_brand,
              category: item.item_category,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              id: item.product_reference_id,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              variant: item.item_variant_name,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name: item.item_name,
              dimension1: '',
              dimension2: '',
              dimension3: '',
              dimension4: '',
              price: item.price,
              position: item.index,
            })),
          },
        },
      }

    case 'add_to_cart':
      return {
        event: 'addToCart',
        currencyCode: evt.params.currency,
        ecommerce: {
          add: {
            products: (evt.params.items ?? []).map((item) => ({
              brand: item.item_brand,
              category: item.item_category,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              id: item.product_reference_id,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              variant: item.item_variant_name,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name: item.item_name,
              price: item.price,
              quantity: item.quantity,
              dimension1: '',
              dimension2: '',
              dimension3: '',
            })),
          },
        },
      }

    case 'remove_from_cart':
      return {
        event: 'removeFromCart',
        ecommerce: {
          remove: {
            products: (evt.params.items ?? []).map((items) => ({
              brand: items.item_brand,
              category: items.item_category,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              id: items.product_reference_id,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              variant: items.item_variant_name,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              name: items.item_name,
              price: items.price,
              quantity: items.quantity,
              dimension1: '',
              dimension2: '',
              dimension3: '',
            })),
          },
        },
      }

    case 'view_item_list': {
      return {
        event: 'productImpression',
        ecommerce: {
          impressions: (evt.params.items ?? []).map((item) => ({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            name: item.item_name,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            id: item.product_reference_id,
            price: item.price,
            brand: item.item_brand,
            category: item.item_category,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            variant: item.item_variant_name,
            list: item.item_list_id,
            position: item.index,
          })),
        },
      }
    }

    case 'page_view':
      return {
        event: 'pageView',
        visitorId: evt.params.visitorId,
        pageType: evt.params.pageType,
        location: evt.params.location,
        page: evt.params.page,
        referrer: evt.params.referrer,
      }

    case 'add_wish_list':
      return {
        event: 'addToWishlist',
        productId: evt.params.productId,
        name: evt.params.name,
      }

    case 'remove_wish_list':
      return {
        event: 'removeWishList',
        productId: evt.params.productId,
      }

    case 'promo_click':
      return {
        event: 'promoClick',
        id: evt.params.id,
        name: evt.params.name,
        position: evt.params.position,
      }

    case 'promo_view':
      return {
        event: 'promoView',
        ecommerce: {
          id: evt.params.id,
          name: evt.params.name,
          position: evt.params.position,
        },
      }

    default: {
      return null
    }
  }
}

export const AnalyticsHandler = () => {
  useAnalyticsEvent((event: AnalyticsEvent) => {
    const universalAnalyticsData = parseToUniversalAnalyticsData(event)
    // Cleans the ecommerce object before pushing a new one
    // This prevents the new data from getting perged with the previous one
    // which could lead do inacurate and old data being sent with events
    //
    // source: https://developers.google.com/tag-manager/ecommerce-ga4?hl=pt-br#clearing_the_ecommerce_object

    window.dataLayer.push({ ecommerce: null })
    window.dataLayer.push(universalAnalyticsData)

    import(`./platform/${storeConfig.platform}`).then(
      ({ default: sendEvent }) => {
        sendEvent(event)
      }
    )
  })

  return null
}

export default AnalyticsHandler
