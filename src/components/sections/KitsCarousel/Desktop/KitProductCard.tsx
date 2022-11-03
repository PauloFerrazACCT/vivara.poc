/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useMemo, useState } from 'react'
import { Image } from 'src/components/ui/Image'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import './kit-product-card.scss'
import { useProductLink } from 'src/sdk/product/useProductLink'
import { Link } from 'gatsby'
import WishlistHeart from 'src/components/ui/WishlistHeart'
import { useWishlistContext } from 'src/contexts/wishlist-context'
import AddToWishlistModal from 'src/components/modal/AddToWishlistModal'
import SingleInputModal from 'src/components/modal/SingleInputModal'
import { addProductOnReducer } from 'src/components/sections/CollectionCarousel/Event/AddProducts'
import { useInView } from 'react-intersection-observer'
import useReleaseDate from 'src/hooks/useReleaseDate'
import ReleaseTag from 'src/components/common/ReleaseTag'

import CardPriceRange from './CardPriceRange'

const imgOptions = {
  sourceWidth: 1024,
  layout: 'constrained' as const,
  loading: 'eager' as const,
  sizes: '(max-width: 768px) 25vw, 30vw',
  breakpoints: [360, 480, 720, 1024],
}

function KitProductCard({
  product,
  index,
  aspectRatio = 1,
  dispatcher,
  productsDataToEvent,
}: Props) {
  const { ref, inView } = useInView()
  const [isMouseOver, setIsMouseOver] = useState(false)

  useEffect(() => {
    addProductOnReducer(productsDataToEvent, inView, product, dispatcher)
  }, [inView])

  const {
    name,
    isVariantOf,
    releaseDate,
    image: productImages,
    offers: { lowPrice: spotPrice, offers },
  } = product

  const isNewRelease = useReleaseDate(releaseDate, 2)

  const { hasVariant: variants } = isVariantOf
  const haveVariants = variants && variants.length > 1
  const [img] = productImages
  const [cardImage, setCardImage] = useState<string>(img.url)

  // TODO: Move this computation to the backend
  const selectedOffer = useMemo(() => {
    const lowestPriceOffer = offers.findIndex((x) => x.price === spotPrice)

    if (lowestPriceOffer === -1) {
      console.error(
        'Could not find the lowest price product offer. Showing the first offer provided.'
      )

      return 0
    }

    return lowestPriceOffer
  }, [spotPrice, offers])

  const { removeProductFromWishlist, createWishlist, addProductToWishlist } =
    useWishlistContext()

  const [isSaveProductModalOpen, setIsSaveProductModalOpen] = useState(false)
  const [isCreateWishlistModalOpen, setIsCreateWishlistModalOpen] =
    useState(false)

  const linkProps = useProductLink({ product, selectedOffer, index })

  const handleHover = (isMouseIn: boolean) => {
    setIsMouseOver(isMouseIn)

    const hoverImage = productImages?.filter((productimg) =>
      productimg.url.includes('_hover')
    )

    setCardImage(
      isMouseIn && hoverImage[0]?.url ? hoverImage[0].url : productImages[0].url
    )
  }

  return (
    <>
      {isSaveProductModalOpen && (
        <AddToWishlistModal
          product={product}
          productId={product.id}
          isOpen={isSaveProductModalOpen}
          setIsOpen={setIsSaveProductModalOpen}
          openWishlistModal={() => setIsCreateWishlistModalOpen(true)}
        />
      )}
      {isCreateWishlistModalOpen && (
        <SingleInputModal
          title="Dê um nome para sua lista"
          btnText="Salvar"
          isOpen={isCreateWishlistModalOpen}
          setIsOpen={setIsCreateWishlistModalOpen}
          modalAction={createWishlist}
          setIsSaveProductModalOpen={setIsSaveProductModalOpen}
          onClose={() => setIsSaveProductModalOpen(true)}
        />
      )}
      <div
        className="kit-product-card"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        ref={ref}
      >
        <Link {...linkProps} title={name} className="kit-product-card__name">
          <Image
            baseUrl={cardImage ?? img.url}
            alt={img.alternateName}
            aspectRatio={aspectRatio}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            {...imgOptions}
          />
        </Link>
        {isMouseOver && (
          <WishlistHeart
            id={product.id}
            hasBackgroundColor={false}
            onFilledHeartClick={() => removeProductFromWishlist(product.id)}
            onEmptyHeartClick={() => addProductToWishlist(product.id, 0)}
            pdpPath={linkProps.to}
          />
        )}
        <div className="kit-product-card__content">
          {isNewRelease && <ReleaseTag variant="product-card" />}
          <Link {...linkProps} title={name} className="kit-product-card__name">
            <h3 className="kit-product-card__name-product">{name}</h3>

            <p className="kit-product-card__quantity-product">
              {haveVariants ? `${variants.length} tamanhos` : '1 tamanho'}
            </p>
            <div className="kit-product-card__cost">
              <CardPriceRange variants={variants} />
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default memo(KitProductCard)

interface Props {
  product: ProductSummary_ProductFragment
  index: number
  bordered?: boolean
  outOfStock?: boolean
  aspectRatio?: number
  variant?: string
  dispatcher?: React.Dispatch<any>
  productsDataToEvent?: ProductSummary_ProductFragment[]
}
