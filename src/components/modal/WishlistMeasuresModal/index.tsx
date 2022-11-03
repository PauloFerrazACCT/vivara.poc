import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioOption } from '@faststore/ui'
import { useWishlistContext } from 'src/contexts/wishlist-context'
import SizeGuideGif from 'src/images/sizeguide.gif'
import sizeList from 'src/mocks/measures'
import BaseModal from 'src/components/modal/BaseModal'

import './styles.scss'

interface WishlistMeasuresModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  currentSize: number
  productIndex: number
}

function WishlistMeasuresModal({
  isOpen,
  setIsOpen,
  currentSize,
  productIndex,
}: WishlistMeasuresModalProps) {
  const { changeWishlistProductSize } = useWishlistContext()

  const [chosenOption, setChosenOption] = useState<number>(0)

  useEffect(() => {
    setChosenOption(currentSize)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValueChange = (e: any) => {
    const option = parseInt(e.currentTarget.value, 10)

    setChosenOption(option)
  }

  const onModalClose = () => {
    if (chosenOption !== currentSize && chosenOption !== 0) {
      changeWishlistProductSize(productIndex, chosenOption)
    }

    setIsOpen(false)
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onCloseButtonClick={onModalClose}
      className="wishlist-measures-modal"
    >
      <div className="wishlist-measures-modal__know-size">
        <h2 className="wishlist-measures-modal__know-size__title">
          Descubra seu tamanho
        </h2>
        <img
          className="wishlist-measures-modal__know-size__gif"
          src={SizeGuideGif}
          alt="gif passo a passo medição circuferência dos dedos"
        />
      </div>
      <span className="wishlist-measures-modal__divider" />
      <div className="wishlist-measures-modal__sizes">
        <h2 className="wishlist-measures-modal__sizes__title">
          Selecione o tamanho
        </h2>
        <div className="wishlist-measures-modal__radio-group">
          <RadioGroup
            name="radio-group"
            selectedValue={chosenOption}
            onChange={onValueChange}
          >
            {sizeList?.map(({ value, size }) => (
              <div key={value} className="wishlist-measures-modal__option">
                <RadioOption value={value} label="measure">
                  <div className="wishlist-measures-modal__option-info">
                    <span>{value}</span>
                    <span className="wishlist-measures-modal__option-size">
                      {size} cm
                    </span>
                  </div>
                </RadioOption>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </BaseModal>
  )
}

export default WishlistMeasuresModal
