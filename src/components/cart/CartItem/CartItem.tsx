import { Card, CardActions, CardContent, CardImage } from '@faststore/ui'
import TrashBin from 'src/components/icons/TrashBin'
import React from 'react'
import Button from 'src/components/ui/Button'
import { Image } from 'src/components/ui/Image'
import Price from 'src/components/ui/Price'
import QuantitySelector from 'src/components/ui/QuantitySelector'
import { cartStore } from 'src/sdk/cart'
import { useRemoveButton } from 'src/sdk/cart/useRemoveButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useAvailableItems } from 'src/hooks/useAvailableItems'
import './cart-item.scss'
import ShowSizeSKU from 'src/components/sections/ShowSizeSKU'
import type { CartItem as ICartItem } from 'src/sdk/cart'

interface Props {
  item: ICartItem
}

function CartItem({ item }: Props) {
  const btnProps = useRemoveButton(item)
  const { availableItemsValue } = useAvailableItems({
    sku: item.itemOffered.sku,
  })

  return (
    <Card
      className="cart-item"
      data-testid="cart-item"
      data-sku={item.itemOffered.sku}
      data-seller={item.seller.identifier}
    >
      <CardContent>
        <CardImage>
          <Image
            baseUrl={item.itemOffered.image?.[0].url}
            alt={item.itemOffered.image?.[0].alternateName}
            sourceWidth={360}
            aspectRatio={1}
            width={72}
            breakpoints={[50, 100, 150]}
            layout="constrained"
            backgroundColor="#f0f0f0"
            options={{
              fitIn: true,
            }}
          />
        </CardImage>
      </CardContent>

      <CardActions>
        <div data-cart-item-summary>
          <p className="text-body">{item.itemOffered.isVariantOf.name}</p>
          <Button
            variant="tertiary"
            icon={<TrashBin />}
            iconPosition="left"
            {...btnProps}
          />
        </div>
        <ShowSizeSKU item={item} />
        <div data-cart-quantity>
          <QuantitySelector
            min={1}
            initial={item.quantity}
            onChange={(quantity) =>
              cartStore.updateItemQuantity(item.id, quantity)
            }
          />
          <Price
            value={item.listPrice}
            formatter={useFormattedPrice}
            testId="list-price"
            data-value={item.listPrice}
            variant={item.listPrice > item.price ? 'listing' : undefined}
            classes="text-body-small"
            SRText="Original price:"
          />
        </div>

        {availableItemsValue && availableItemsValue < 5 && (
          <span className="available-items-description">
            {availableItemsValue === 1
              ? 'Apenas uma unidade disponível'
              : `(${availableItemsValue}) disponíveis`}
          </span>
        )}
        <span data-cart-item-prices>
          Total:
          <Price
            value={item.price * item.quantity}
            formatter={useFormattedPrice}
            testId="price"
            data-value={item.price}
            variant="spot"
            classes="title-subsection"
            SRText="Price:"
          />
        </span>
      </CardActions>
    </Card>
  )
}

export default CartItem
