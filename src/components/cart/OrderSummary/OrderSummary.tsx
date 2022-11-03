import type { ReactNode } from 'react'
import React from 'react'
import { List } from '@faststore/ui'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'

import './order-summary.scss'

interface OrderSummaryProps {
  subTotal: number
  total: number
  numberOfItems: number
  checkoutButton?: ReactNode
}

function OrderSummary({
  subTotal,
  total,
  numberOfItems,
  checkoutButton,
}: OrderSummaryProps) {
  const discount = subTotal - total
  const formattedDiscount = useFormattedPrice(discount)

  const textSingular = 'produto'
  const textPlural = 'produtos'

  const quantityProducts = numberOfItems > 1 ? textPlural : textSingular

  return (
    <>
      <List className="order-summary" data-order-summary>
        <li>
          <span>
            Subtotal ({numberOfItems} {quantityProducts})
          </span>
          <span>{useFormattedPrice(subTotal)}</span>
        </li>
        {discount > 0 && (
          <li data-order-summary-discount>
            <span>Desconto </span>
            <span>- {formattedDiscount}</span>
          </li>
        )}
        <li className="title-subsection">
          <span>Total</span>
          <span>{useFormattedPrice(total)}</span>
        </li>
        <li className="title-shipping-price">
          <span>O valor da entrega será calculado na sacola</span>
        </li>
      </List>
      <div className="checkout-button">{checkoutButton}</div>
    </>
  )
}

export default OrderSummary
