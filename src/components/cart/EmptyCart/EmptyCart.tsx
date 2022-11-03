import React from 'react'
import Button from 'src/components/ui/Button'

import './empty-cart.scss'

interface Props {
  /**
   * This function is called when `Start Shopping` button is clicked
   */
  onDismiss: () => void
}

function EmptyCart({ onDismiss }: Props) {
  return (
    <div data-testid="cart-empty-state" data-empty-cart>
      <div data-empty-cart-title>
        <p>SUA SACOLA ESTÁ VAZIA.</p>
      </div>
      <div>
        <Button onClick={onDismiss} variant="primary" className="empty-button">
          CONTINUAR COMPRANDO
        </Button>
      </div>
    </div>
  )
}

export default EmptyCart
