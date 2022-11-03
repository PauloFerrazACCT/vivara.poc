/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useMemo, useState } from 'react'
import { Image } from 'src/components/ui/Image'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import './product-card.scss'
import { useProductLink } from 'src/sdk/product/useProductLink'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { Link } from 'gatsby'
import Price from 'src/components/ui/Price'
import { Installment } from 'src/components/ui/Installment'
import BuyButton from 'src/components/ui/BuyButton'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useWishlistContext } from 'src/contexts/wishlist-context'
import AddToWishlistModal from 'src/components/modal/AddToWishlistModal'
import SingleInputModal from 'src/components/modal/SingleInputModal'
import { addProductOnReducer } from 'src/components/sections/CollectionCarousel/Event/AddProducts'
import { useInView } from 'react-intersection-observer'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import useReleaseDate from 'src/hooks/useReleaseDate'
import ReleaseTag from 'src/components/common/ReleaseTag'
import loadable from '@loadable/component'

const WishlistHeart = loadable(() => import('src/components/ui/WishlistHeart'))

const imgOptions = {
  sourceWidth: 1024,
  layout: 'constrained' as const,
  loading: 'lazy' as const,
  sizes: '(max-width: 768px) 25vw, 30vw',
  breakpoints: [360, 480, 720, 1024],
}

const HandlePrice = ({
  spotPrice,
  listPrice,
  isProductAvailable,
  price,
  shelfClass,
}: any) => {
  return (
    <>
      {listPrice !== (isProductAvailable ? spotPrice : price) ? (
        <>
          <span className={`${shelfClass}__value-before`}>
            <Price
              value={listPrice}
              formatter={useFormattedPrice}
              testId="price"
              data-value={listPrice}
              variant="listing"
              classes="text-body"
              SRText="Sale Price:"
            />
          </span>
          <span className={`${shelfClass}__value`}>
            <Price
              value={isProductAvailable ? spotPrice : price}
              formatter={useFormattedPrice}
              testId="price"
              data-value={isProductAvailable ? spotPrice : price}
              variant="spot"
              classes="text-body"
              SRText="Sale Price:"
            />
          </span>
        </>
      ) : (
        <>
          {price === 0 ? (
            <BuyButton disabled data-card-buy-button="true">
              AVISE-ME
            </BuyButton>
          ) : (
            <span className={`${shelfClass}__value-spaced`}>
              <Price
                value={isProductAvailable ? spotPrice : price}
                formatter={useFormattedPrice}
                testId="price"
                data-value={isProductAvailable ? spotPrice : price}
                variant="spot"
                classes="text-body"
                SRText="Sale Price:"
              />
            </span>
          )}
        </>
      )}
      <span className={`${shelfClass}__installments`}>
        <Installment
          value={isProductAvailable ? spotPrice : price}
          formatter={useFormattedPrice}
        />
      </span>
    </>
  )
}

const HandleMouseOver = ({
  haveVariants,
  variants,
  buyDisabled,
  price,
  buyProps,
  linkProps,
}: any) => {
  const checkStock = (variant: any) => {
    return (
      variant?.offers?.offers?.[0]?.availability ===
      'https://schema.org/InStock'
    )
  }

  const variantsInStock = variants.filter(checkStock).length > 0

  return (
    <>
      {haveVariants ? (
        <>
          {price === 0 || !variantsInStock ? (
            <BuyButton disabled data-card-buy-button="true">
              INDISPONÍVEL
            </BuyButton>
          ) : (
            <Link className="product-card__pdp-link" {...linkProps}>
              COMPRAR
            </Link>
          )}
        </>
      ) : (
        <BuyButton
          disabled={buyDisabled}
          data-card-buy-button="true"
          {...buyProps}
        >
          {price === 0 || buyDisabled ? 'INDISPONÍVEL' : 'COMPRAR'}
        </BuyButton>
      )}
    </>
  )
}

function ProductCard({
  product,
  index,
  aspectRatio = 1,
  variant,
  dispatcher,
  productsDataToEvent,
}: Props) {
  const { ref, inView } = useInView()
  const [isMouseOver, setIsMouseOver] = useState(false)
  const shelfClass = variant
    ? `shelf-product-card-${variant}`
    : 'shelf-product-card'

  useEffect(() => {
    addProductOnReducer(productsDataToEvent, inView, product, dispatcher)
  }, [inView])

  const {
    id,
    name,
    sku,
    brand,
    isVariantOf,
    gtin,
    releaseDate,
    image: productImages,
    offers: { lowPrice: spotPrice, offers },
    additionalProperty,
  } = product

  const isNewRelease = useReleaseDate(releaseDate, 2)

  const { hasVariant: variants } = isVariantOf
  const haveVariants = variants && variants.length > 1
  const [img] = productImages
  const [cardImage, setCardImage] = useState<string>(img.url)

  const variantsInStock = variants?.filter(
    (variantUnit: { offers: { offers: Array<{ availability: string }> } }) => {
      return (
        variantUnit?.offers?.offers?.[0]?.availability ===
        'https://schema.org/InStock'
      )
    }
  )

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

  const {
    listPrice,
    price,
    availability: productAvailability,
    seller,
  } = offers[selectedOffer]

  const { removeProductFromWishlist, createWishlist, addProductToWishlist } =
    useWishlistContext()

  const [isSaveProductModalOpen, setIsSaveProductModalOpen] = useState(false)
  const [isCreateWishlistModalOpen, setIsCreateWishlistModalOpen] =
    useState(false)

  const linkProps = useProductLink({ product, selectedOffer, index })

  const buyDisabled = productAvailability !== 'https://schema.org/InStock'

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

  const handleHover = (isMouseIn: boolean) => {
    setIsMouseOver(isMouseIn)
    const hoverImage = productImages?.filter((productimg) =>
      productimg.url.includes('_hover')
    )

    if (!isMouseIn) {
      setCardImage(productImages[0]?.url)
    }

    const hoverImageByLabel = productImages?.filter(
      (productimg) => productimg.alternateName === 'hover' && productimg.url
    )

    if (isMouseIn && hoverImage[0]?.url) {
      setCardImage(hoverImage[0]?.url)
    }

    if (isMouseIn && hoverImageByLabel[0]?.url) {
      setCardImage(hoverImageByLabel[0]?.url)
    }

    if (
      isMouseIn &&
      !hoverImage[0]?.url &&
      !hoverImageByLabel[0]?.url &&
      productImages[1]?.url
    ) {
      setCardImage(productImages[1]?.url)
    }

    if (
      isMouseIn &&
      !hoverImage[0]?.url &&
      !hoverImageByLabel[0]?.url &&
      !productImages[1]?.url
    ) {
      setCardImage(productImages[0]?.url)
    }
  }

  const { width } = useWindowDimensions()
  const isNotebook = width > 965

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
        className={shelfClass}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        ref={ref}
      >
        <Link {...linkProps} title={name} className={`${shelfClass}__name`}>
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
        <div className={`${shelfClass}__content`}>
          {!variantsInStock && !isMouseOver && (
            <div className={`${shelfClass}__unavailable-flag`}>
              Indisponível
            </div>
          )}
          {isNewRelease && <ReleaseTag variant="product-card" />}
          <Link {...linkProps} title={name} className={`${shelfClass}__name`}>
            <h3 className={`${shelfClass}__name-product`}>{name}</h3>
          </Link>
          <div className={`${shelfClass}__cost`}>
            {!isMouseOver || !isNotebook ? (
              <HandlePrice
                spotPrice={spotPrice}
                listPrice={listPrice}
                price={price}
                isProductAvailable={!productAvailability}
                shelfClass={shelfClass}
              />
            ) : (
              <HandleMouseOver
                haveVariants={haveVariants}
                variants={variants}
                buyDisabled={buyDisabled}
                price={price}
                buyProps={buyProps}
                linkProps={linkProps}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(ProductCard)

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
