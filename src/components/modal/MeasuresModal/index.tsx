import React, { useState } from 'react'
import { RadioGroup, RadioOption } from '@faststore/ui'

import sizeList from '../../../mocks/measures'
import SizeGuideGif from '../../../images/sizeguide.gif'
import BaseModal from '../BaseModal'
import './styles.scss'

interface MeasuresModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  currentMeasure: number
  onClose: (newMeasure: number) => void
}

function MeasuresModal({
  isOpen,
  setIsOpen,
  currentMeasure,
  onClose,
}: MeasuresModalProps) {
  const [chosenOption, setChosenOption] = useState<number>(currentMeasure)

  const onRadioGroupValueChange = (e: any) => {
    const option = parseInt(e.currentTarget.value, 10)

    setChosenOption(option)
  }

  const onModalClose = () => {
    if (currentMeasure !== chosenOption) {
      onClose(chosenOption)
    }

    setIsOpen(false)
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onCloseButtonClick={onModalClose}
      className="measures-modal"
    >
      <div className="measures-modal__know-size">
        <h2 className="measures-modal__know-size__title">
          Descubra seu tamanho
        </h2>
        <img
          className="measures-modal__know-size__gif"
          src={SizeGuideGif}
          alt="gif passo a passo medição circuferência dos dedos"
        />
      </div>
      <span className="measures-modal__divider" />
      <div className="measures-modal__sizes">
        <h2 className="measures-modal__sizes__title">Selecione o tamanho</h2>
        <div className="measures-modal__radio-group">
          <RadioGroup
            name="radio-group"
            selectedValue={chosenOption}
            onChange={onRadioGroupValueChange}
          >
            {sizeList?.map(({ value, size }) => (
              <div key={value} className="measures-modal__option">
                <RadioOption value={value} label="measure">
                  <div className="measures-modal__option-info">
                    <span>{value}</span>
                    <span className="measures-modal__option-size">
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

export default MeasuresModal
