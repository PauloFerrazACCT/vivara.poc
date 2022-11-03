import React, { useEffect, useState } from 'react'
import { Installment } from 'src/components/ui/Installment'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { Image } from 'src/components/ui/Image'
import WhitePlusIcon from 'src/images/svg/WhitePlusIcon'
import { sendAnalyticsEvent } from '@faststore/sdk'
import { useSession } from 'src/sdk/session'
import type { CurrencyCode, AddToCartEvent } from '@faststore/sdk'
import IconButton from 'src/components/ui/IconButton'
import BlackArrowUp from 'src/components/icons/BlackArrowUp'
import BlackArrowDown from 'src/components/icons/BlackArrowDown'
import { useCart, cartStore } from 'src/sdk/cart'
import { useUI } from 'src/sdk/ui/Provider'

import ProductDetailAccordion from './ProductDetailAccordion'

function TotalPrice({ mainProductVariants, secondaryProductVariants }: any) {
  const mainLowPriceArray = mainProductVariants?.map((e: any) => {
    return e?.offers?.lowPrice
  })

  const secondLowPriceArray = secondaryProductVariants?.map((e: any) => {
    return e?.offers?.lowPrice
  })

  const mainSortedArray = mainLowPriceArray
    ?.sort((a: number, b: number) => {
      return a - b
    })
    ?.filter((e: number) => {
      return e > 0
    })

  const secondSortedArray = secondLowPriceArray
    ?.sort((a: number, b: number) => {
      return a - b
    })
    ?.filter((e: number) => {
      return e > 0
    })

  const mainLowestPrice = mainSortedArray?.[0]

  const secondLowestPrice = secondSortedArray?.[0]

  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const kitTotalPrice = mainLowestPrice + secondLowestPrice

  return (
    <>
      <div className="total-price">{useFormattedPrice(kitTotalPrice)}</div>
      <Installment value={kitTotalPrice} formatter={useFormattedPrice} isKit />
    </>
  )
}

function handleAddToCart({
  products,
  lowestOffer1,
  lowestOffer2,
  cartId,
  itemsCart,
  openCart,
  newItems,
  code,
}: any) {
  sendAnalyticsEvent<AddToCartEvent, any>({
    name: 'add_to_cart',
    params: {
      currency: code as CurrencyCode,
      value:
        Number(lowestOffer1.mainProductPrice) +
        Number(lowestOffer2.secondaryProductPrice),
      items: [
        {
          item_id: products[0].itemOffered.isVariantOf.productGroupID,
          item_name: products[0].itemOffered.isVariantOf.name,
          item_brand: products[0].itemOffered.brand.name,
          item_variant: products[0].itemOffered.sku,
          quantity: 1,
          price: lowestOffer1.price,
          discount: lowestOffer1.listPrice - lowestOffer1.price,
          currency: code as CurrencyCode,
          item_variant_name: products[0].itemOffered.name,
          product_reference_id: products[0].itemOffered.gtin,
        },
        {
          item_id: products[1].itemOffered.isVariantOf.productGroupID,
          item_name: products[1].itemOffered.isVariantOf.name,
          item_brand: products[1].itemOffered.brand.name,
          item_variant: products[1].itemOffered.sku,
          quantity: 1,
          price: lowestOffer2.price,
          discount: lowestOffer2.listPrice - lowestOffer2.price,
          currency: code as CurrencyCode,
          item_variant_name: products[1].itemOffered.name,
          product_reference_id: products[1].itemOffered.gtin,
        },
      ],
    },
  })

  for (const product in products) {
    newItems.push(products[product])
  }

  cartStore.set({ id: cartId, items: [...itemsCart, ...newItems] })
  openCart()
}

const MobileTotalCard = ({
  mainProduct,
  secondaryProduct,
  mainProductId,
  secondaryProductId,
  buttonLabel,
  isProductDetailVisible,
  setIsProductDetailVisible,
}: any) => {
  const [mainProductVariants, setMainProductVariants] = useState()
  const [secondaryProductVariants, setSecondaryProductVariants] = useState()
  const [lowestOffer1, setLowestOffer1] = useState<any>({})
  const [lowestOffer2, setLowestOffer2] = useState<any>({})

  const {
    currency: { code },
  } = useSession()

  const { id: cartId, items: itemsCart } = useCart()
  const { openCart } = useUI()

  const mainProductSpotPrice = mainProduct?.offers?.lowPrice
  const mainProductOffers = mainProduct?.offers?.offers

  const secondaryProductSpotPrice = secondaryProduct?.offers?.lowPrice
  const secondaryProductOffers = secondaryProduct?.offers?.offers

  const newItems: any[] = []

  useEffect(() => {
    if (
      !mainProductSpotPrice ||
      !mainProductOffers ||
      !secondaryProductSpotPrice ||
      !secondaryProductOffers
    ) {
      return
    }

    const mainIndex =
      mainProductOffers?.findIndex(
        (x: any) => x.price === mainProductSpotPrice
      ) === -1
        ? 0
        : mainProductOffers?.findIndex(
            (x: any) => x.price === mainProductSpotPrice
          )

    const {
      listPrice: mainProductListPrice,
      price: mainProductPrice,
      availability: mainProductAvailability,
      seller: mainProductSeller,
    } = mainProductOffers[mainIndex]

    setLowestOffer1({
      mainProductListPrice,
      mainProductPrice,
      mainProductAvailability,
      mainProductSeller,
    })

    const secondaryIndex =
      secondaryProductOffers?.findIndex(
        (x: any) => x.price === secondaryProductSpotPrice
      ) === -1
        ? 0
        : secondaryProductOffers?.findIndex(
            (x: any) => x.price === secondaryProductSpotPrice
          )

    const {
      listPrice: secondaryProductListPrice,
      price: secondaryProductPrice,
      availability: secondaryProductAvailability,
      seller: secondaryProductSeller,
    } = secondaryProductOffers[secondaryIndex]

    setLowestOffer2({
      secondaryProductListPrice,
      secondaryProductPrice,
      secondaryProductAvailability,
      secondaryProductSeller,
    })
  }, [
    mainProductOffers,
    mainProductSpotPrice,
    secondaryProductOffers,
    secondaryProductSpotPrice,
  ])

  const products = [
    {
      ...mainProduct,
      seller: lowestOffer1?.mainProductSeller,
      price: lowestOffer1?.mainProductPrice,
      listPrice: lowestOffer1?.mainProductListPrice,
      quantity: 1,
      itemOffered: { ...mainProduct },
    },
    {
      ...secondaryProduct,
      seller: lowestOffer2?.secondaryProductSeller,
      price: lowestOffer2?.secondaryProductPrice,
      listPrice: lowestOffer2?.secondaryProductListPrice,
      quantity: 1,
      itemOffered: { ...secondaryProduct },
    },
  ]

  const imgOptions = {
    sourceWidth: 720,
    layout: 'constrained' as const,
    loading: 'lazy' as const,
    sizes: '(max-width: 720px) 25vw, 30vw',
    breakpoints: [360, 480, 720],
  }

  useEffect(() => {
    mainProduct.isVariantOf !== undefined &&
      setMainProductVariants(mainProduct.isVariantOf.hasVariant)

    secondaryProduct.isVariantOf !== undefined &&
      setSecondaryProductVariants(secondaryProduct.isVariantOf.hasVariant)
  }, [
    mainProduct,
    mainProductVariants,
    secondaryProduct,
    secondaryProductVariants,
  ])

  const { image: mainProductImages } = mainProduct
  const { image: secondaryProductImages } = secondaryProduct

  const cartProps = {
    products,
    lowestOffer1,
    lowestOffer2,
    cartId,
    itemsCart,
    openCart,
    newItems,
    code,
  }

  const kitIsNotAvailable =
    lowestOffer2?.secondaryProductPrice === 0 ||
    lowestOffer1?.mainProductPrice === 0 ||
    lowestOffer2?.secondaryProductAvailability !==
      'https://schema.org/InStock' ||
    lowestOffer1?.mainProductAvailability !== 'https://schema.org/InStock'

  const showDetailsIcon = isProductDetailVisible ? (
    <BlackArrowUp />
  ) : (
    <BlackArrowDown />
  )

  return (
    <>
      <div
        className="total-container__info-mobile"
        role="button"
        tabIndex={0}
        onClick={
          kitIsNotAvailable ? () => null : () => handleAddToCart(cartProps)
        }
        onKeyUp={() => handleAddToCart(cartProps)}
      >
        <div className="images-wrapper">
          <Image
            className="first-image"
            baseUrl={mainProductImages[0].url}
            alt={mainProductImages[0].alternateName}
            aspectRatio={1}
            {...imgOptions}
          />
          <div className="plus-icon-container">
            <WhitePlusIcon />
          </div>
          <Image
            className="second-image"
            baseUrl={secondaryProductImages[0].url}
            alt={secondaryProductImages[0].alternateName}
            aspectRatio={1}
            {...imgOptions}
          />
        </div>
        <h3>{kitIsNotAvailable ? 'Kit Indisponível' : buttonLabel}</h3>
        {!kitIsNotAvailable ? (
          <TotalPrice
            mainProductVariants={mainProductVariants}
            secondaryProductVariants={secondaryProductVariants}
          />
        ) : (
          <p className="out-of-stock-message">
            Mas temos outros itens incríveis. Que tal dar uma olhada?
          </p>
        )}
      </div>
      {isProductDetailVisible && (
        <ProductDetailAccordion
          mainProduct={mainProduct}
          secondaryProduct={secondaryProduct}
          mainProductVariants={mainProductVariants}
          secondaryProductVariants={secondaryProductVariants}
          mainProductId={mainProductId}
          secondaryProductId={secondaryProductId}
        />
      )}
      <IconButton
        className="show-more-details-button"
        aria-label="Show Product Details"
        icon={showDetailsIcon}
        onClick={() => setIsProductDetailVisible(!isProductDetailVisible)}
      />
    </>
  )
}

export default MobileTotalCard
