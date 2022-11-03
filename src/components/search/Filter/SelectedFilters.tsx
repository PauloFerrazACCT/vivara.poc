import React, { memo, useState } from 'react'
import type { IStoreSelectedFacet } from '@faststore/api'

import { ApplyFilters } from './ApplyFilters'

interface SelectedFiltersProps {
  selectedFacets: IStoreSelectedFacet[]
}

function formatPrice(price: string) {
  return Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(price))
}

function SelectedFilters({ selectedFacets }: SelectedFiltersProps) {
  const [facetsToRemove, setFacetsToRemove] = useState<IStoreSelectedFacet[]>(
    []
  )

  let label: string

  const onFacetClick = (item: IStoreSelectedFacet) => {
    if (
      selectedFacets
        .filter((facet) => facet.key === item.key)
        .some(
          (facet) =>
            facet.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '') ===
            item.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        )
    ) {
      const indexToRemove = selectedFacets.findIndex(
        (f) =>
          f.key + f.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '') ===
          item.key + item.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      )

      selectedFacets.some(
        (facet) =>
          facet.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '') ===
          item.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      ) && setFacetsToRemove([...facetsToRemove, item])

      selectedFacets.splice(indexToRemove, 1)

      const otherProps = {
        minPriceSelected: undefined,
        maxPriceSelected: undefined,
      }

      ApplyFilters({ selectedFacets, ...otherProps })
    }
  }

  const filteredSelectedFacets = selectedFacets.filter(
    (facet) => facet.key.toLowerCase() !== 'productclusterids'
  )

  const valueSelectedFilter = filteredSelectedFacets?.map(({ key, value }) => {
    if (key === 'price') {
      const prices = value.split('-to-')

      label = `De ${formatPrice(prices[0])} até ${formatPrice(prices[1])}`
    }

    return (
      <li key={key + value}>
        <button
          className="selectedFilters__list--item"
          onClick={() => onFacetClick({ key, value })}
        >
          {key === 'price' ? label : value}
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.53035 1.53033C9.82325 1.23744 9.82325 0.762563 9.53035 0.46967C9.23746 0.176777 8.76259 0.176777 8.46969 0.46967L9.53035 1.53033ZM0.46967 8.46969C0.176777 8.76259 0.176777 9.23746 0.46967 9.53035C0.762563 9.82325 1.23744 9.82325 1.53033 9.53035L0.46967 8.46969ZM1.53036 0.46967C1.23746 0.176777 0.762589 0.176777 0.469695 0.46967C0.176802 0.762563 0.176802 1.23744 0.469695 1.53033L1.53036 0.46967ZM8.46972 9.53035C8.76261 9.82325 9.23749 9.82325 9.53038 9.53035C9.82327 9.23746 9.82327 8.76259 9.53038 8.46969L8.46972 9.53035ZM8.46969 0.46967L0.46967 8.46969L1.53033 9.53035L9.53035 1.53033L8.46969 0.46967ZM0.469695 1.53033L8.46972 9.53035L9.53038 8.46969L1.53036 0.46967L0.469695 1.53033Z"
              fill="#272727"
            />
          </svg>
        </button>
      </li>
    )
  })

  return (
    <>
      {filteredSelectedFacets?.length > 0 && (
        <div className="selectedFilters">
          <ul className="selectedFilters__list">{valueSelectedFilter}</ul>
        </div>
      )}
    </>
  )
}

export default memo(SelectedFilters)
