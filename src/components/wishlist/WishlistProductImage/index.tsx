import React from 'react'
import { useProduct } from 'src/sdk/product/useProduct'

import './styles.scss'

interface WishlistProductImageProps {
  product: WishlistProduct
}

export const WishlistProductImage = ({
  product,
}: WishlistProductImageProps) => {
  const { data } = useProduct(product.productId)

  if (!data) {
    return null
  }

  const { name, image } = data.product

  return (
    <div className="wishlist-product__image-container">
      <img
        className="wishlist-product__image"
        alt={name}
        src={image?.[0].url}
      />
    </div>
  )
}
