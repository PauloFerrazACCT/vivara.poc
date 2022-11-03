import React, { useEffect, useState } from 'react'
import BuyButton from 'src/components/ui/BuyButton'
import { sendAnalyticsEvent } from '@faststore/sdk'
import { useSession } from 'src/sdk/session'
import type { CurrencyCode, AddToCartEvent } from '@faststore/sdk'
import { useProduct } from 'src/sdk/product/useProduct'
import WhitePlusIcon from 'src/images/svg/WhitePlusIcon'
import BlackEqualIcon from 'src/images/svg/BlackEqualIcon'
import { useCart, cartStore } from 'src/sdk/cart'
import { useUI } from 'src/sdk/ui/Provider'

import KitProductCard from './KitProductCard'
import './kit-slide.scss'
import TotalPriceCard from './DesktopTotalPriceCard'

type Props = {
  mainProductId?: number
  setMainProductId: React.Dispatch<React.SetStateAction<number | undefined>>
  secondaryProductId?: number
  setSecondaryProductId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >
  buttonLabel?: string
  productKitInfo: {
    mainProductSku: string
    secondaryProductSku: string
  }
}

const KitSlide = ({
  mainProductId,
  setMainProductId,
  secondaryProductId,
  setSecondaryProductId,
  buttonLabel = 'COMPRAR ESTE PAR',
  productKitInfo: { mainProductSku, secondaryProductSku },
}: Props) => {
  const [mainProductInfo, setMainProductInfo] = useState<any>()
  const [secondaryProductInfo, setSecondaryProductInfo] = useState<any>()

  const mainProduct = useProduct(mainProductSku)
  const secondaryProduct = useProduct(secondaryProductSku)

  const [products, setProducts] = useState<any>()

  const {
    currency: { code },
  } = useSession()

  useEffect(() => {
    if (!mainProduct.data || mainProductInfo !== undefined) {
      return
    }

    setMainProductInfo(mainProduct.data.product)
    setMainProductId(
      Number(mainProduct.data.product.isVariantOf.productGroupID)
    )
  }, [mainProduct.data, mainProductInfo, setMainProductId])

  useEffect(() => {
    if (!secondaryProduct.data || secondaryProductInfo !== undefined) {
      return
    }

    setSecondaryProductInfo(secondaryProduct.data.product)
    setSecondaryProductId(
      Number(secondaryProduct.data.product.isVariantOf.productGroupID)
    )
  }, [secondaryProduct.data, secondaryProductInfo, setSecondaryProductId])

  const { id: cartId, items: itemsCart } = useCart()
  const { openCart } = useUI()

  const mainProductSpotPrice = mainProductInfo?.offers?.lowPrice
  const mainProductOffers = mainProductInfo?.offers?.offers

  const secondaryProductSpotPrice = secondaryProductInfo?.offers?.lowPrice
  const secondaryProductOffers = secondaryProductInfo?.offers?.offers

  const [lowestOffer1, setLowestOffer1] = useState<any>({})
  const [lowestOffer2, setLowestOffer2] = useState<any>({})

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

    setProducts([
      {
        ...mainProductInfo,
        seller: lowestOffer1?.mainProductSeller,
        price: lowestOffer1?.mainProductPrice,
        listPrice: lowestOffer1?.mainProductListPrice,
        quantity: 1,
        itemOffered: { ...mainProductInfo },
      },
      {
        ...secondaryProductInfo,
        seller: lowestOffer2?.secondaryProductSeller,
        price: lowestOffer2?.secondaryProductPrice,
        listPrice: lowestOffer2?.secondaryProductListPrice,
        quantity: 1,
        itemOffered: { ...secondaryProductInfo },
      },
    ])
  }, [
    lowestOffer1?.mainProductListPrice,
    lowestOffer1?.mainProductPrice,
    lowestOffer1?.mainProductSeller,
    lowestOffer2?.secondaryProductListPrice,
    lowestOffer2?.secondaryProductPrice,
    lowestOffer2?.secondaryProductSeller,
    mainProductInfo,
    mainProductOffers,
    mainProductSpotPrice,
    secondaryProductInfo,
    secondaryProductOffers,
    secondaryProductSpotPrice,
  ])

  const newItems: any[] = []

  const kitIsNotAvailable =
    lowestOffer2?.secondaryProductPrice === 0 ||
    lowestOffer1?.mainProductPrice === 0 ||
    lowestOffer2?.secondaryProductAvailability !==
      'https://schema.org/InStock' ||
    lowestOffer1?.mainProductAvailability !== 'https://schema.org/InStock'

  return (
    <div className="kit-slide__container">
      {mainProductId && mainProductInfo && (
        <KitProductCard product={mainProductInfo} index={mainProductId} />
      )}

      <div className="plus-icon-container">
        <WhitePlusIcon />
      </div>

      {secondaryProductId && secondaryProductInfo && (
        <KitProductCard
          product={secondaryProductInfo}
          index={secondaryProductId}
        />
      )}
      <div className="equal-icon-container">
        <BlackEqualIcon />
      </div>
      <div className="total-container">
        {mainProductInfo && secondaryProductInfo && (
          <TotalPriceCard
            kitIsNotAvailable={kitIsNotAvailable}
            mainProduct={mainProductInfo}
            secondaryProduct={secondaryProductInfo}
          />
        )}

        <BuyButton
          disabled={kitIsNotAvailable}
          data-card-buy-button="true"
          onClick={async () => {
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

            for (const product of products) {
              newItems.push(product)
            }

            cartStore.set({ id: cartId, items: [...itemsCart, ...newItems] })
            openCart()
          }}
        >
          {kitIsNotAvailable ? 'INDISPONÍVEL' : buttonLabel}
        </BuyButton>
      </div>
    </div>
  )
}

export default KitSlide
