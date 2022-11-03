import React from 'react'
import { useSearch } from '@faststore/sdk'
import uniqBy from 'lodash.uniqby'
import './styles.scss'

type NavigationButtonsDataProps = {
  label: string
  filterKey: string
  filterValue: string
}

type NavigationItemsProps = {
  allItems: NavigationButtonsDataProps[]
  subtitle: string
}

type NavigationButtonsProps = {
  buttons: NavigationItemsProps
}

type NavigationAllItemsProps = {
  allItems: NavigationButtonsProps[]
}

type Props = {
  title: string
  description: string
  buttonLayout: NavigationAllItemsProps
}

function NavigationButtons({ buttonLayout, title, description }: Props) {
  const {
    setState,
    state,
    state: { selectedFacets },
  } = useSearch()

  const onApply = (itemButton: NavigationButtonsDataProps) => {
    const { filterKey, filterValue } = itemButton
    const newsFacets = uniqBy(
      [
        {
          key: filterKey,
          value: filterValue,
        },
        ...selectedFacets,
      ],
      'key'
    )

    setState({
      ...state,
      selectedFacets: newsFacets,
      page: 0,
    })
  }

  function isSelected(value: string) {
    const response = selectedFacets.filter((e) => {
      return e.value === value
    })

    return !!response.length
  }

  return (
    <div className="navigation-buttons-container">
      <div className="navigation-buttons-description">
        <div className="navigation-buttons-title">
          <h2>{title}</h2>
        </div>
        <div className="navigation-buttons-subtitle">
          <p>{description}</p>
        </div>
        <div className="navigation-buttons-description-border" />

        <div className="navigation-buttons-content">
          {buttonLayout?.allItems?.map(({ buttons }, index) => {
            return (
              <div className="navigation-buttons-content__row" key={index}>
                {buttons?.subtitle ? <h4>{buttons.subtitle}</h4> : null}
                {buttons?.allItems?.map((itemButton) => {
                  return (
                    <button
                      onClick={() => onApply(itemButton)}
                      aria-label={`link para ${itemButton?.label}`}
                      key={itemButton?.label}
                      className={`navigation-buttons-link-area ${
                        isSelected(itemButton.filterValue) ? 'selected' : ''
                      }`}
                    >
                      {itemButton?.label}
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default NavigationButtons
