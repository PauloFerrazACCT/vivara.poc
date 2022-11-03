import React, { useEffect, useState } from 'react'
import { useProduct } from 'src/sdk/product/useProduct'

import './kit-slide-mobile.scss'

import MobileTotalCard from './MobileTotalCard'

type Props = {
  mainProductId?: number
  setMainProductId: React.Dispatch<React.SetStateAction<number | undefined>>
  secondaryProductId?: number
  setSecondaryProductId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >
  isProductDetailVisible: boolean
  setIsProductDetailVisible: React.Dispatch<React.SetStateAction<boolean>>
  buttonLabel?: string
  productKitInfo: {
    mainProductSku: string
    secondaryProductSku: string
  }
}

const KitSlideMobile = ({
  mainProductId,
  setMainProductId,
  secondaryProductId,
  setSecondaryProductId,
  isProductDetailVisible,
  setIsProductDetailVisible,
  buttonLabel = 'Comprar este par',
  productKitInfo: { mainProductSku, secondaryProductSku },
}: Props) => {
  const [mainProductInfo, setMainProductInfo] = useState<any>()
  const [secondaryProductInfo, setSecondaryProductInfo] = useState<any>()

  const mainProduct = useProduct(mainProductSku)
  const secondaryProduct = useProduct(secondaryProductSku)

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

  return (
    <div className="kit-slide__container-mobile">
      {mainProductInfo && secondaryProductInfo && (
        <MobileTotalCard
          mainProduct={mainProductInfo}
          secondaryProduct={secondaryProductInfo}
          mainProductId={mainProductId}
          secondaryProductId={secondaryProductId}
          buttonLabel={buttonLabel}
          isProductDetailVisible={isProductDetailVisible}
          setIsProductDetailVisible={setIsProductDetailVisible}
        />
      )}
    </div>
  )
}

export default KitSlideMobile
