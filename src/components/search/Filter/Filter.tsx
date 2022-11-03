import { useSearch } from '@faststore/sdk'
import { graphql } from 'gatsby'
import { X as XIcon } from 'phosphor-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import IconButton from 'src/components/ui/IconButton'
import SlideOver from 'src/components/ui/SlideOver'
import type {
  IStoreSelectedFacet,
  Filter_FacetsFragment,
} from '@generated/graphql'

import { ApplyFilters } from './ApplyFilters'
import SelectedFilters from './SelectedFilters'
import type { Values } from './Facets'
import Facets from './Facets'

import './filter.scss'

interface FilterProps {
  facets: Filter_FacetsFragment[]
  /*
   * Control whether the filter modal is open. (mobile only)
   */
  isOpen?: boolean
  /*
   * Change isOpen boolean state. (mobile only)
   */
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  /**
   * This function is called whenever the user hits "Escape", clicks outside
   * the filter modal or clicks in close button. (mobile only)
   */
  onDismiss?: () => void
  /**
   * ID to find this component in testing tools (e.g.: cypress,
   * testing-library, and jest).
   */
  testId?: string

  term: string | null

  base: string
}

type ActiveFacets = {
  facets: string[]
  accordionIndex: number
}

type Callback = () => unknown

function Filter({
  facets,
  onDismiss,
  isOpen = false,
  setIsOpen,
  testId = 'store-filter',
  term,
  base,
}: FilterProps) {
  const { state: searchState, resetInfiniteScroll } = useSearch()

  const dismissTransition = useRef<Callback | undefined>()

  const [indicesExpanded, setIndicesExpanded] = useState<Set<number>>(
    new Set([])
  )

  const [selectedFacets, setSelectedFacets] = useState<IStoreSelectedFacet[]>(
    searchState.selectedFacets ?? []
  )

  const [facetsToRemove, setFacetsToRemove] = useState<IStoreSelectedFacet[]>(
    []
  )

  const [minPriceSelected, setMinPriceSelected] = useState<string>()
  const [maxPriceSelected, setMaxPriceSelected] = useState<string>()
  const [activeFacets, setActiveFacets] = useState<ActiveFacets[]>([])

  const filteredFacets = facets.filter(
    (facet) => facet.key.toLocaleLowerCase() !== 'productclusterids'
  )

  filteredFacets.map((item) => {
    if (item.label === 'Preço') {
      item.label = 'Valor'
    }

    if (item.label === 'Category 4') {
      item.label = 'Tipo de produto'
    }

    if (item.key === 'sugestao' || item.label === 'Sugestão') {
      item.label = 'Público'
    }

    return null
  })

  const facetsFormatted = filteredFacets.reduce(
    (initial: any, current: any) => {
      if (current.values?.length > 1 || current.key === 'price') {
        return initial.concat(current)
      }

      return initial
    },
    []
  )

  const jewelryFacetsFormatted = filteredFacets.reduce(
    (initial: any, current: any) => {
      if (
        (current.values?.length > 1 || current.key === 'price') &&
        current.key !== 'brand' &&
        current.key !== 'sugestao' &&
        current.key !== 'dimensao' &&
        current.key !== 'espessura' &&
        current.key !== 'malha'
      ) {
        return initial.concat(current)
      }

      return initial
    },
    []
  )

  const onAccordionChange = useCallback((index: number) => {
    if (indicesExpanded.has(index)) {
      indicesExpanded.delete(index)
      setIndicesExpanded(new Set(indicesExpanded))

      return
    }

    indicesExpanded.clear()

    setIndicesExpanded(new Set(indicesExpanded.add(index)))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ensures all required states are up to date at opening
  useEffect(() => {
    if (isOpen) {
      return
    }

    setActiveFacets([])
    setFacetsToRemove([])
    setSelectedFacets(searchState.selectedFacets)
  }, [isOpen, searchState.selectedFacets])

  // Opens accordion items with active facets
  useEffect(() => {
    // Ensures all the active facets were identified
    if (activeFacets.length !== filteredFacets.length) {
      return
    }

    // Ensures there isn't empty facets
    const selectedActiveFacets = activeFacets.filter(
      (item) => item.facets.length > 0
    )

    // Checks if accordion item is already opened
    isOpen &&
      selectedActiveFacets.forEach(
        ({ accordionIndex }) =>
          !indicesExpanded.has(accordionIndex) &&
          onAccordionChange(accordionIndex)
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeFacets])

  const onFacetChange = (item: IStoreSelectedFacet) => {
    if (
      selectedFacets
        .filter((facet) => facet.key === item.key)
        .some(
          (facet) =>
            facet.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '') ===
            item.value
        )
    ) {
      const indexToRemove = selectedFacets.findIndex(
        (f) => f.key + f.value === item.key + item.value
      )

      selectedFacets.some((facet) => facet.value === item.value) &&
        setFacetsToRemove([...facetsToRemove, item])

      selectedFacets.splice(indexToRemove, 1)
      setSelectedFacets([...selectedFacets])

      return
    }

    setSelectedFacets([...selectedFacets, item])
  }

  const onAccordionItemMount = (index: number, values: any) => {
    // Ensures only one array item for each accordion's item
    if (activeFacets.length >= filteredFacets.length) {
      return
    }

    // Filter current selected facets from API
    const selectedValues = values.filter(({ selected }: any) => selected)

    activeFacets.push({
      accordionIndex: index,
      facets: selectedValues.map(({ value }: any) => value),
    })
    setActiveFacets(activeFacets)
  }

  const cleanUpFacets = (values: Values) => {
    values.forEach((value) => {
      const facetToRemove = selectedFacets.find(
        (facet) => facet.value === value.value
      ) ?? { key: '', value: '' }

      const indexToRemove = selectedFacets.findIndex(
        (f) => f.value === value.value
      )

      selectedFacets.some((facet) => facet.value === value.value) &&
        setFacetsToRemove([...facetsToRemove, facetToRemove])

      selectedFacets.splice(indexToRemove, 1)
      setSelectedFacets([...selectedFacets])
    })
    setIndicesExpanded(new Set([]))
    setIsOpen(false)
  }

  const priceFacet = facetsFormatted.filter((e: any) => e.key === 'price')

  const minAbsolutePrice: number | undefined = priceFacet[0]?.min?.absolute
  const maxAbsolutePrice: number | undefined = priceFacet[0]?.max?.absolute

  const onApply = () => {
    const applyFilterProps = {
      selectedFacets,
      minAbsolutePrice,
      maxAbsolutePrice,
      minPriceSelected,
      maxPriceSelected,
    }

    ApplyFilters(applyFilterProps)
    resetInfiniteScroll(0)

    setIndicesExpanded(new Set([]))
    dismissTransition.current?.()
    setIsOpen(false)
  }

  return (
    <>
      <div className="hidden-mobile">
        <Facets
          testId={`desktop-${testId}`}
          selectedFacets={selectedFacets}
          cleanUpFacets={cleanUpFacets}
          filteredFacets={
            base.indexOf('/vivara/joias/') !== -1 &&
            selectedFacets.length === 3 &&
            (selectedFacets[2].value === 'aneis' ||
              selectedFacets[2].value === 'brincos' ||
              selectedFacets[2].value === 'colares' ||
              selectedFacets[2].value === 'correntes' ||
              selectedFacets[2].value === 'pingentes' ||
              selectedFacets[2].value === 'pulseiras')
              ? jewelryFacetsFormatted
              : facetsFormatted
          }
          indicesExpanded={indicesExpanded}
          onApply={onApply}
          onFacetChange={onFacetChange}
          onAccordionChange={onAccordionChange}
          onAccordionItemMount={onAccordionItemMount}
          term={term}
          base={base}
          minPriceSelected={minPriceSelected}
          maxPriceSelected={maxPriceSelected}
          setMinPriceSelected={setMinPriceSelected}
          setMaxPriceSelected={setMaxPriceSelected}
        />
        {selectedFacets?.length > 0 && (
          <SelectedFilters selectedFacets={selectedFacets} />
        )}
      </div>

      <SlideOver
        isOpen={isOpen}
        onDismiss={onDismiss}
        onDismissTransition={(callback) =>
          (dismissTransition.current = callback)
        }
        size="partial"
        direction="rightSide"
        className="filter-modal__content"
      >
        <div className="filter-modal__body">
          <header className="filter-modal__header">
            <h2 className="title-display">Filtrar</h2>
            <IconButton
              data-testid="filter-modal-button-close"
              classes="filter-modal__button"
              aria-label="Fechar filtros"
              icon={<XIcon size={32} />}
              onClick={() => {
                setSelectedFacets(searchState.selectedFacets)
                dismissTransition.current?.()
              }}
            />
          </header>

          {selectedFacets?.length > 0 && (
            <SelectedFilters selectedFacets={selectedFacets} />
          )}

          <Facets
            testId={`mobile-${testId}`}
            selectedFacets={selectedFacets}
            cleanUpFacets={cleanUpFacets}
            filteredFacets={
              base.indexOf('/vivara/joias/') !== -1 &&
              selectedFacets.length === 3 &&
              (selectedFacets[2].value === 'aneis' ||
                selectedFacets[2].value === 'brincos' ||
                selectedFacets[2].value === 'colares' ||
                selectedFacets[2].value === 'correntes' ||
                selectedFacets[2].value === 'pingentes' ||
                selectedFacets[2].value === 'pulseiras')
                ? jewelryFacetsFormatted
                : facetsFormatted
            }
            indicesExpanded={indicesExpanded}
            onFacetChange={onFacetChange}
            onAccordionChange={onAccordionChange}
            onApply={onApply}
            onAccordionItemMount={onAccordionItemMount}
            term={term}
            base={base}
            minPriceSelected={minPriceSelected}
            maxPriceSelected={maxPriceSelected}
            setMinPriceSelected={setMinPriceSelected}
            setMaxPriceSelected={setMaxPriceSelected}
          />
        </div>
      </SlideOver>
    </>
  )
}

export const fragment = graphql`
  fragment Filter_facets on StoreFacet {
    ... on StoreFacetRange {
      key
      label
      min {
        selected
        absolute
      }
      max {
        selected
        absolute
      }
      __typename
    }
    ... on StoreFacetBoolean {
      key
      label
      values {
        label
        value
        selected
        quantity
      }
      __typename
    }
  }
`

export default Filter
