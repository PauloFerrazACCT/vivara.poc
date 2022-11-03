import React, { useMemo } from 'react'
import WhitePlusIcon from 'src/images/svg/WhitePlusIcon'
import { Link } from 'gatsby'
import { useProductLink } from 'src/sdk/product/useProductLink'

import CardPriceRange from '../Desktop/CardPriceRange'

const ProductDetails = ({ product, variants, index }: any) => {
  const {
    name,
    offers: { lowPrice: spotPrice, offers },
  } = product

  const selectedOffer = useMemo(() => {
    const lowestPriceOffer = offers.findIndex((x: any) => x.price === spotPrice)

    if (lowestPriceOffer === -1) {
      console.error(
        'Could not find the lowest price product offer. Showing the first offer provided.'
      )

      return 0
    }

    return lowestPriceOffer
  }, [spotPrice, offers])

  const linkProps = useProductLink({ product, selectedOffer, index })

  return (
    <Link {...linkProps} title={name} className="kit-product-card__name">
      <h3 className="kit-product-card__name-product">{name}</h3>

      <p className="kit-product-card__quantity-product">
        {variants && variants.length > 1
          ? `${variants.length} tamanhos`
          : '1 tamanho'}
      </p>
      <div className="kit-product-card__cost">
        <CardPriceRange variants={variants} />
      </div>
    </Link>
  )
}

const ProductDetailAccordion = ({
  mainProduct,
  secondaryProduct,
  mainProductId,
  secondaryProductId,
  mainProductVariants,
  secondaryProductVariants,
}: any) => {
  return (
    <div className="product-detail-container">
      <ProductDetails
        product={mainProduct}
        variants={mainProductVariants}
        index={mainProductId}
      />
      <div className="product-detail-container-divider">
        <div className="plus-icon-light-container">
          <WhitePlusIcon />
        </div>
      </div>
      <ProductDetails
        product={secondaryProduct}
        variants={secondaryProductVariants}
        index={secondaryProductId}
      />
    </div>
  )
}

export default ProductDetailAccordion
