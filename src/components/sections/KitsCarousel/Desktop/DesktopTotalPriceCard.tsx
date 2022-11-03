import React, { useEffect, useState } from 'react'
import { Installment } from 'src/components/ui/Installment'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'

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

const DesktopTotalPriceCard = ({
  mainProduct,
  secondaryProduct,
  kitIsNotAvailable,
}: any) => {
  const [mainProductVariants, setMainProductVariants] = useState()
  const [secondaryProductVariants, setSecondaryProductVariants] = useState()

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

  const names = `${mainProduct?.name} + ${secondaryProduct?.name}`

  return (
    <div className="total-container__info">
      <h3>{kitIsNotAvailable ? 'Kit Indisponível' : 'Valor total'}</h3>
      {!kitIsNotAvailable && (
        <TotalPrice
          mainProductVariants={mainProductVariants}
          secondaryProductVariants={secondaryProductVariants}
        />
      )}
      <p className="product-names">{names}</p>
    </div>
  )
}

export default DesktopTotalPriceCard
