/* eslint-disable no-console */
import type { BrowserProductQueryQuery } from '@generated/graphql'
import { useEffect, useState } from 'react'

type InferredType<T> = T extends Array<infer U> ? U : T

const useOffer = (
  product: BrowserProductQueryQuery['product'],
  selectedSKU: InferredType<
    BrowserProductQueryQuery['product']['isVariantOf']['hasVariant']
  >
) => {
  const [indexOfAvailableSku, setIndexOfAvailableSku] = useState(0)
  const {
    offers: {
      offers: [
        {
          availability: productAvailability,
          price: productPrice,
          listPrice: productListPrice,
          seller: productSeller,
        },
      ],
      lowPrice: productLowPrice,
    },
    isVariantOf: { hasVariant: skuVariants },
  } = product

  const {
    offers: { offers: skuOffers, lowPrice: skuLowPrice },
  } = selectedSKU

  useEffect(() => {
    const skuAvailableIndex = skuVariants?.findIndex(
      (skuVariant) =>
        skuVariant.offers?.offers?.[0]?.availability ===
        'https://schema.org/InStock'
    )

    setIndexOfAvailableSku(skuAvailableIndex)
  }, [skuOffers, skuVariants])

  const skuAvailability =
    skuVariants?.[indexOfAvailableSku]?.offers?.offers?.[0]?.availability

  const skuPrice =
    skuVariants?.[indexOfAvailableSku]?.offers?.offers?.[0]?.price

  const skuListPrice =
    skuVariants?.[indexOfAvailableSku]?.offers?.offers?.[0]?.listPrice

  const skuSeller =
    skuVariants?.[indexOfAvailableSku]?.offers?.offers?.[0]?.seller

  const availability =
    skuOffers.length > 0 ? skuAvailability : productAvailability

  const price = skuOffers.length > 0 ? skuPrice : productPrice

  const listPrice = skuOffers.length > 0 ? skuListPrice : productListPrice

  const seller = skuOffers.length > 0 ? skuSeller : productSeller

  const lowPrice = skuOffers.length > 0 ? skuLowPrice : productLowPrice

  return availability === 'https://schema.org/InStock'
    ? {
        availability,
        price,
        listPrice,
        seller,
        lowPrice,
      }
    : {
        availability,
        price: skuOffers?.[0].price,
        listPrice: skuOffers?.[0].listPrice,
        seller,
        lowPrice,
      }
}

export default useOffer
