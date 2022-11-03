import { RadioGroup, RadioOption } from '@faststore/ui'
import React, { useState } from 'react'
import Button from 'src/components/ui/VivaraButton'
import { useWishlistContext } from 'src/contexts/wishlist-context'

import BaseModal from '../BaseModal'

import './styles.scss'

interface AddToWishlistModalProps {
  product: any
  productIndex?: number
  productId?: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setWasProductAdded?: React.Dispatch<React.SetStateAction<boolean>>
  setWasProductMoved?: React.Dispatch<React.SetStateAction<boolean>>
  openWishlistModal: () => void
}

const AddToWishlistModal = ({
  product,
  productIndex,
  productId,
  isOpen,
  setIsOpen,
  setWasProductMoved,
  setWasProductAdded,
  openWishlistModal,
}: AddToWishlistModalProps) => {
  const { lists, moveWishlistProduct, addProductToWishlist } =
    useWishlistContext()

  const [chosenOption, setChosenOption] = useState(-1)

  const onCreateListClick = () => {
    setIsOpen(false)
    openWishlistModal()
  }

  const onMoveProductClick = () => {
    if (productIndex !== undefined) {
      moveWishlistProduct(productIndex, chosenOption)
    } else if (productId) {
      addProductToWishlist(productId, chosenOption)
      window.postMessage({
        name: 'AnalyticsEvent',
        params: {
          name: 'store:add_wish_list',
          params: {
            productId: product.id,
            name: product.name,
          },
        },
      })
    }

    setIsOpen(false)

    if (setWasProductMoved) {
      setWasProductMoved(true)
    }

    if (setWasProductAdded) {
      setWasProductAdded(true)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValueChange = (e: any) => {
    const option = parseInt(e.currentTarget.value, 10)

    setChosenOption(option)
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onCloseButtonClick={() => setIsOpen(false)}
      className="move-wishlist-modal"
    >
      <h5 className="move-wishlist-modal__header">
        {`Para qual das listas você deseja ${
          setWasProductMoved ? 'mover' : 'adicionar'
        } este produto?`}
      </h5>
      <div className="move-wishlist-modal__radio-group">
        <RadioGroup
          name="radio-group"
          selectedValue={chosenOption}
          onChange={onValueChange}
        >
          <div className="move-wishlist-modal__options">
            {lists?.map((list, index) => (
              <RadioOption key={index} value={index} label="measure">
                <div className="move-wishlist-modal__option">
                  <span>{list.name}</span>
                </div>
              </RadioOption>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="move-wishlist-modal__btn-container">
        <Button
          variant="dark"
          disabled={chosenOption < 0}
          onClick={onMoveProductClick}
        >
          {`${setWasProductMoved ? 'Mover' : 'Adicionar'} produto`}
        </Button>
        <Button variant="outlined" onClick={onCreateListClick}>
          Criar Lista
        </Button>
      </div>
    </BaseModal>
  )
}

export default AddToWishlistModal
