import React from 'react'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { Installment } from 'src/components/ui/Installment'

function CardPriceRange({ variants }: any) {
  const lowPriceArray = variants.map((e: any) => {
    return e.offers.lowPrice
  })

  const sortedArray = lowPriceArray
    .sort((a: number, b: number) => {
      return a - b
    })
    .filter((e: number) => {
      return e > 0
    })

  const [lowestPrice] = sortedArray

  const formattedLowestPrice = Intl.NumberFormat('pt-br', {
    style: 'decimal',
  }).format(sortedArray[0])

  const formattedHighestPrice = Intl.NumberFormat('pt-br', {
    style: 'decimal',
  }).format(sortedArray[sortedArray.length - 1])

  return (
    <>
      {lowestPrice && (
        <>
          <p>
            {formattedLowestPrice !== formattedHighestPrice
              ? `de R$ ${formattedLowestPrice} a R$ ${
                  sortedArray[sortedArray.length - 1]
                }`
              : `R$ ${formattedLowestPrice}`}
          </p>

          <Installment
            value={sortedArray[0]}
            formatter={useFormattedPrice}
            isKit
          />
        </>
      )}
    </>
  )
}

export default CardPriceRange
