import React from 'react'
import BuyButton from 'src/components/ui/BuyButton'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'

function WishlistBuyButton({ productInfo, offer }: any) {
  const {
    sku,
    name,
    gtin,
    image: productImages,
    brand,
    isVariantOf,
    id,
    additionalProperty,
  } = productInfo

  const { price, listPrice, seller } = offer

  const buyProps = useBuyButton({
    id,
    price,
    listPrice,
    seller,
    quantity: 1,
    itemOffered: {
      sku,
      name,
      gtin,
      image: productImages,
      brand,
      isVariantOf,
      additionalProperty,
    },
  })

  return <BuyButton {...buyProps}>ADICIONAR À SACOLA</BuyButton>
}

export default WishlistBuyButton
