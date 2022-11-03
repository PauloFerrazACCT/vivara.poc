import React, { memo } from 'react'
import { useDiscountPercent } from 'src/sdk/product/useDiscountPercent'

import Badge from './Badge'

import './badge.scss'

type Props = {
  listPrice: number
  spotPrice: number
  small?: boolean
  // Set limit percentage value to consider a low discount.
  thresholdLow?: number
  // Set limit percentage value to consider a high discount
  thresholdHigh?: number
}

const DiscountBadge = ({
  listPrice,
  spotPrice,
  small = false,
  thresholdLow = 15,
  thresholdHigh = 40,
}: Props) => {
  const discountPercent = Math.round(
    Number(useDiscountPercent(listPrice, spotPrice))
  )

  if (!discountPercent) {
    return <></>
  }

  if (discountPercent === 100) {
    return <></>
  }

  if (discountPercent < 0) {
    return <></>
  }

  const discountVariant =
    discountPercent <= thresholdLow
      ? 'low'
      : discountPercent <= thresholdHigh
      ? 'medium'
      : 'high'

  return (
    <div className="flex-space-between">
      <Badge small={small} data-store-discount-badge-variant={discountVariant}>
        {discountPercent}% off
      </Badge>
    </div>
  )
}

export default memo(DiscountBadge)
