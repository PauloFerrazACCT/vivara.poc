import { useContext, useEffect } from 'react'

import { SkuContext } from './index'
import type { BrowserProductQueryQuery } from '../../../@generated/graphql/index'

export const useSkuContext = () => {
  const context = useContext(SkuContext)

  if (context === undefined) {
    throw new Error('Product context provider missing from React tree')
  }

  return context
}

export const useSelectedSKU = (
  product: BrowserProductQueryQuery['product']
) => {
  const { selectedSKU, setSelectedSKU } = useSkuContext()

  useEffect(() => {
    if (product.isVariantOf.hasVariant.length > 1) {
      const availableIndex = product?.isVariantOf?.hasVariant?.findIndex(
        (variant) =>
          variant?.offers?.offers?.[0]?.availability ===
          'https://schema.org/InStock'
      )

      setSelectedSKU(availableIndex)
    }
  }, [product, setSelectedSKU])

  const index =
    0 < selectedSKU && selectedSKU < product.isVariantOf.hasVariant.length
      ? selectedSKU
      : 0

  return product.isVariantOf.hasVariant[index]
}
