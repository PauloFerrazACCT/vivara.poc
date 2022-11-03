import type { ProductSummary_ProductFragment } from '@generated/graphql'
import type { CurrencyCode, ViewItemListEvent } from '@faststore/sdk'
import { sendAnalyticsEvent } from '@faststore/sdk'

export const sendProductImpression = (
  products: ProductSummary_ProductFragment[] | undefined,
  page: number,
  pageSize: number,
  title: string,
  code: string
) => {
  sendAnalyticsEvent<ViewItemListEvent>({
    name: 'view_item_list',
    params: {
      item_list_name: title,
      item_list_id: title,
      items: products?.map((product, index) => ({
        item_id: product.isVariantOf.productGroupID,
        item_name: product.isVariantOf.name,
        item_brand: product.brand.name,
        item_variant: product.sku,
        price: product.offers.offers?.[0].price,
        index: page * pageSize + index + 1,
        discount:
          product.offers.offers?.[0].listPrice -
          product.offers.offers?.[0].price,
        currency: code as CurrencyCode,
        item_variant_name: product.name,
        product_reference_id: product.gtin,
      })),
    },
  })
}
