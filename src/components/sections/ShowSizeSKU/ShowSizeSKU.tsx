import type { FC } from 'react'
import React from 'react'
import './styles.scss'
import type { CartItem as ICartItem } from 'src/sdk/cart'

interface Props {
  item: ICartItem & { itemOffered: { isVariantOf: { hasVariant?: any } } }
}

const ShowSizeSKU: FC<Props> = ({
  item: {
    id,
    itemOffered: { isVariantOf },
  },
}) => {
  const idProduct = Number(id.split(':', 3)[0])
  const skusList = isVariantOf?.hasVariant

  const skuData = skusList?.find(
    ({ sku, additionalProperty }: any) =>
      Number(sku) === idProduct && additionalProperty
  )

  if (!skuData) {
    return null
  }

  const {
    additionalProperty: [property],
  } = skuData

  return (
    <>
      {property && (
        <div className="c-sku">
          <span className="c-sku__text">Tamanho: </span>
          <span className="c-sku__value">{property?.value}</span>
        </div>
      )}
    </>
  )
}

export default ShowSizeSKU
