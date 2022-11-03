/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

import './price-range.scss'

type Props = {
  min: any
  max: any
  minPriceSelected?: string
  maxPriceSelected?: string
  setMinPriceSelected: React.Dispatch<React.SetStateAction<string | undefined>>
  setMaxPriceSelected: React.Dispatch<React.SetStateAction<string | undefined>>
}

function PriceRange({
  min,
  max,
  minPriceSelected,
  maxPriceSelected,
  setMinPriceSelected,
  setMaxPriceSelected,
}: Props) {
  const minAbsoluteFormatted = Math.floor(min.absolute)
  const maxAbsoluteFormatted = Math.floor(max.absolute)

  function onChangeInputMin(value: string) {
    if (value < min.absolute || value > max.absolute) {
      value.length
        ? setMinPriceSelected(min.absolute)
        : setMinPriceSelected(undefined)

      return
    }

    setMinPriceSelected(value)
  }

  function onChangeInputMax(value: string) {
    if (value < min.absolute || value > max.absolute) {
      value.length
        ? setMaxPriceSelected(max.absolute)
        : setMaxPriceSelected(undefined)

      return
    }

    setMaxPriceSelected(value)
  }

  const minInputTextColor = minPriceSelected ? 'dark-text' : 'light-text'
  const maxInputTextColor = maxPriceSelected ? 'dark-text' : 'light-text'

  return (
    <div className="price-range__container">
      <div className="price-range__min-container">
        <label className="price-range__input-label">
          <p className="price-range__input-label-text">Valor mínimo</p>
          <div className={`price-range__input-container-${minInputTextColor}`}>
            <span>R$</span>
            <input
              className="price-range__min-input"
              type="number"
              placeholder={minAbsoluteFormatted.toString()}
              step="1"
              min={minAbsoluteFormatted}
              max={maxAbsoluteFormatted}
              onChange={(e) =>
                onChangeInputMin(e.target.value.replace('.', ''))
              }
            />
            <span>,00</span>
          </div>
        </label>
      </div>
      <p className="price-range__input-divider">até</p>
      <div className="price-range__max-container">
        <label className="price-range__input-label">
          <p className="price-range__input-label-text">Valor máximo</p>
          <div className={`price-range__input-container-${maxInputTextColor}`}>
            <span>R$</span>
            <input
              className="price-range__max-input"
              type="number"
              placeholder={maxAbsoluteFormatted.toString()}
              step="1"
              min={minAbsoluteFormatted}
              max={maxAbsoluteFormatted}
              onChange={(e) =>
                onChangeInputMax(e.target.value.replace('.', ''))
              }
            />
            <span>,00</span>
          </div>
        </label>
      </div>
    </div>
  )
}

export default PriceRange
