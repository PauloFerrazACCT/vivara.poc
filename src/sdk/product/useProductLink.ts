import { useMemo } from 'react'
import { sendAnalyticsEvent } from '@faststore/sdk'
import { useSession } from 'src/sdk/session'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import type { SelectItemEvent, CurrencyCode } from '@faststore/sdk'

export type ProductLinkOptions = {
  index: number
  product: ProductSummary_ProductFragment
  selectedOffer: number
}

export const useProductLink = ({
  index,
  product,
  selectedOffer,
}: ProductLinkOptions) => {
  const { slug } = product
  const idSKU = slug.split('-').pop()
  const slug2 = slug.replace(`-${idSKU}`, '')
  const {
    currency: { code },
  } = useSession()

  return useMemo(() => {
    const onClick = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sendAnalyticsEvent<SelectItemEvent, any>({
        name: 'select_item',
        params: {
          items: [
            {
              item_id: product.isVariantOf.productGroupID,
              item_name: product.isVariantOf.name,
              item_brand: product.brand.name,
              item_variant: product.sku,
              index,
              price: product.offers.offers[selectedOffer].price,
              discount:
                product.offers.offers[selectedOffer].listPrice -
                product.offers.offers[selectedOffer].price,
              currency: code as CurrencyCode,
              item_variant_name: product.name,
              product_reference_id: product.gtin,
            },
          ],
        },
      })

      sessionStorage.setItem('clickedProductId', product.id)
    }

    return {
      to: `/${slug2}/p`,
      onClick,
      'data-testid': 'product-link',
    }
  }, [slug, code, product, index, selectedOffer])
}
