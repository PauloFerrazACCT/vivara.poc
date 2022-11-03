import { List } from '@faststore/ui'
import { X as XIcon } from 'phosphor-react'
import React, { useRef } from 'react'
import Button from 'src/components/ui/Button'
import IconButton from 'src/components/ui/IconButton'
import SlideOver from 'src/components/ui/SlideOver'
import { useCart } from 'src/sdk/cart'
import { useCheckoutButton } from 'src/sdk/cart/useCheckoutButton'
import { useUI } from 'src/sdk/ui/Provider'

import CartItem from '../CartItem'
import EmptyCart from '../EmptyCart'
import OrderSummary from '../OrderSummary'

import './cart-sidebar.scss'

type Callback = () => unknown

function CartSidebar() {
  const btnProps = useCheckoutButton()
  const cart = useCart()
  const { cart: displayCart, closeCart } = useUI()
  const dismissTransition = useRef<Callback | undefined>()
  const { items, totalItems, isValidating, subTotal, total } = cart
  const isEmpty = items.length === 0

  return (
    <SlideOver
      isOpen={displayCart}
      onDismiss={closeCart}
      onDismissTransition={(callback) => (dismissTransition.current = callback)}
      size="partial"
      direction="rightSide"
      className={`cart-sidebar ${isEmpty ? 'cart-sidebar--empty' : ''}`}
    >
      <header data-testid="cart-sidebar">
        <div className="cart-sidebar__title" />
        <IconButton
          data-testid="cart-sidebar-button-close"
          aria-label="Close Cart"
          icon={<XIcon size={32} />}
          onClick={() => dismissTransition.current?.()}
          className="cart-sidebar__close"
        />
      </header>

      {isEmpty ? (
        <EmptyCart onDismiss={() => dismissTransition.current?.()} />
      ) : (
        <>
          <List>
            {items?.map((item) => (
              <li key={item.id}>
                <CartItem item={item} />
              </li>
            ))}
          </List>

          <footer>
            <OrderSummary
              subTotal={subTotal}
              total={total}
              numberOfItems={totalItems}
              checkoutButton={
                <Button
                  variant="primary"
                  icon={!isValidating}
                  iconPosition="right"
                  {...btnProps}
                >
                  {isValidating ? 'carregando...' : 'ir para a sacola'}
                </Button>
              }
            />
          </footer>
        </>
      )}
    </SlideOver>
  )
}

export default CartSidebar
