import { Label as UILabel, List as UIList } from '@faststore/ui'
import React, { useState } from 'react'
import Accordion, { AccordionItem } from 'src/components/ui/Accordion'
import Checkbox from 'src/components/ui/Checkbox'
import type {
  IStoreSelectedFacet,
  Filter_FacetsFragment,
} from '@generated/graphql'
import './filter.scss'
import { Link } from 'gatsby'
import useWindowDimensions from 'src/hooks/useWindowDimensions'

import PriceRange from './PriceRange'
import AlphabetFilter from './AlphabetFilter'

interface FacetsProps {
  testId: string
  selectedFacets: IStoreSelectedFacet[]
  term: string | null
  base: string
  filteredFacets: Filter_FacetsFragment[]
  indicesExpanded: Set<number>
  onFacetChange: (item: IStoreSelectedFacet) => void
  onAccordionChange: (index: number) => void
  onApply: () => void
  cleanUpFacets: (values: Values) => void
  onAccordionItemMount: (index: number, values: Values) => void
  minPriceSelected?: string
  maxPriceSelected?: string
  setMinPriceSelected: React.Dispatch<React.SetStateAction<string | undefined>>
  setMaxPriceSelected: React.Dispatch<React.SetStateAction<string | undefined>>
}

export type Values = Array<{
  label: string
  value: string
  selected: boolean
  quantity: number
}>

function Facets({
  testId,
  selectedFacets,
  filteredFacets,
  indicesExpanded,
  term,
  base,
  onFacetChange,
  cleanUpFacets,
  onAccordionChange,
  onApply,
  onAccordionItemMount,
  minPriceSelected,
  maxPriceSelected,
  setMinPriceSelected,
  setMaxPriceSelected,
}: FacetsProps) {
  const { width } = useWindowDimensions()

  const isDesktop = width >= 1279

  const [mostrarMais, setMostrarMais] = useState<boolean>(false)
  const [verMais, setVerMais] = useState<string>('Ver Mais')
  const emptyAlphabetLetter = 0

  function handleMostrarMais(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isexpandedButton: boolean
  ) {
    e.preventDefault()
    setMostrarMais(isexpandedButton)
    mostrarMais === true ? setVerMais('Ver Mais') : setVerMais('Ver Menos')
  }

  const filterSelectedPrice = selectedFacets.filter((e) => e.key === 'price')

  const priceFilterVisibility =
    filterSelectedPrice.length > 0 ? 'none' : 'block'

  const testFacets = (facetValue: string, itemValue: string) =>
    facetValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '') === itemValue

  return (
    <div className="filter" data-store-filter data-testid={testId}>
      <Accordion expandedIndices={indicesExpanded} onChange={onAccordionChange}>
        {filteredFacets?.map(({ label, values, min, max, key }: any, index) => {
          if (key === 'price') {
            return (
              <AccordionItem
                key={`${label}-${index}`}
                prefixId={testId}
                testId={`${testId}-accordion`}
                isExpanded={indicesExpanded.has(index)}
                buttonLabel={label}
                style={{ display: `${priceFilterVisibility}` }}
              >
                <>
                  <header className="filter-header">
                    <div className="filter-header__content">
                      <p className="filter-header__title">
                        CRIE SUA FAIXA DE PREÇO
                      </p>
                      <p className="filter-header__text">Faixa Selecionada</p>
                    </div>
                    <div className="filter-header__controls">
                      <button
                        onClick={() => {
                          return onApply()
                        }}
                      >
                        APLICAR FILTRO
                      </button>
                      {term !== null ? (
                        <Link
                          onClick={() => cleanUpFacets(values)}
                          to={`/s/?q=${term}&sort=score_desc&page=0`}
                        >
                          LIMPAR
                        </Link>
                      ) : (
                        <Link to={base}>LIMPAR</Link>
                      )}
                    </div>
                    {isDesktop && (
                      <div className="filter-header__close-button">
                        <button onClick={() => onAccordionChange(index)}>
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
                      </div>
                    )}
                  </header>
                  <PriceRange
                    min={min}
                    max={max}
                    minPriceSelected={minPriceSelected}
                    maxPriceSelected={maxPriceSelected}
                    setMinPriceSelected={setMinPriceSelected}
                    setMaxPriceSelected={setMaxPriceSelected}
                  />
                </>
              </AccordionItem>
            )
          }

          const itemsSelected = values.filter(
            (value: { selected: any }) => value.selected
          ).length

          // eslint-disable-next-line no-return-assign
          return (
            <AccordionItem
              key={`${label}-${index}`}
              prefixId={testId}
              testId={`${testId}-accordion`}
              isExpanded={indicesExpanded.has(index)}
              buttonLabel={label}
              addicionalLabel={
                itemsSelected > 0 ? itemsSelected.toString() : ''
              }
              ref={(_) => onAccordionItemMount(index, values)}
            >
              <header className="filter-header">
                <div className="filter-header__content">
                  <span className="facets-quantity">
                    {selectedFacets.length} selecionado(s)
                  </span>
                  <div className="facets">
                    {selectedFacets?.map((facet, i) => (
                      <span key={i}>
                        {facet.value}
                        {i !== selectedFacets.length - 1 && <span>,</span>}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="filter-header__controls">
                  <button onClick={onApply}>APLICAR FILTRO</button>
                  {term !== null ? (
                    <Link
                      onClick={() => cleanUpFacets(values)}
                      to={`/s/?q=${term}&sort=score_desc&page=0`}
                    >
                      LIMPAR
                    </Link>
                  ) : (
                    <Link to={base}>LIMPAR</Link>
                  )}
                </div>
                {isDesktop && (
                  <div className="filter-header__close-button">
                    <button onClick={() => onAccordionChange(index)}>
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
                  </div>
                )}
              </header>
              <>
                {values.length > 20 && indicesExpanded.has(index) ? (
                  <>
                    {emptyAlphabetLetter < 24 ? (
                      <>
                        <AlphabetFilter
                          values={values}
                          testId={testId}
                          label={label}
                          selectedFacets={selectedFacets}
                          filteredFacets={filteredFacets}
                          onFacetChange={onFacetChange}
                          KeyRef={key}
                        />
                      </>
                    ) : (
                      <>
                        <UIList>
                          {values?.map((item: any, chave: any) => {
                            const id = `${testId}-${label}-${item.label}`

                            if (mostrarMais === true) {
                              return (
                                <li key={id} className="filter__item">
                                  <Checkbox
                                    id={id}
                                    checked={selectedFacets
                                      .filter((facet) => facet.key === key)
                                      .some((facet2) =>
                                        testFacets(facet2.value, item.value)
                                      )}
                                    onChange={() =>
                                      onFacetChange({
                                        key,
                                        value: item.value,
                                      })
                                    }
                                    data-testid={`${testId}-accordion-panel-checkbox`}
                                    data-value={item.value}
                                    data-quantity={item.quantity}
                                  />
                                  <UILabel htmlFor={id} className="title-small">
                                    {item.label}
                                  </UILabel>
                                  <span>({item.quantity})</span>
                                </li>
                              )
                            }

                            if (chave < 20 && mostrarMais === false) {
                              return (
                                <li key={id} className="filter__item">
                                  <Checkbox
                                    id={id}
                                    checked={selectedFacets
                                      .filter((facet) => facet.key === key)
                                      .some((facet2) =>
                                        testFacets(facet2.value, item.value)
                                      )}
                                    onChange={() =>
                                      onFacetChange({
                                        key,
                                        value: item.value,
                                      })
                                    }
                                    data-testid={`${testId}-accordion-panel-checkbox`}
                                    data-value={item.value}
                                    data-quantity={item.quantity}
                                  />
                                  <UILabel htmlFor={id} className="title-small">
                                    {item.label}
                                  </UILabel>
                                  <span>({item.quantity})</span>
                                </li>
                              )
                            }

                            return null
                          })}
                        </UIList>
                        <div className="flex-row text-align">
                          <button
                            className="buttonVerMaisMenos"
                            onClick={(e) => handleMostrarMais(e, !mostrarMais)}
                          >
                            {verMais}
                          </button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <UIList>
                      {values?.map((item: any) => {
                        const id = `${testId}-${label}-${item.label}`

                        return (
                          <li key={id} className="filter__item">
                            <Checkbox
                              id={id}
                              checked={selectedFacets
                                .filter(
                                  (facet) =>
                                    facet.key !== 'price' && facet.key === key
                                )
                                .some((facet2) =>
                                  testFacets(facet2.value, item.value)
                                )}
                              onChange={() =>
                                onFacetChange({ key, value: item.value })
                              }
                              data-testid={`${testId}-accordion-panel-checkbox`}
                              data-value={item.value}
                              data-quantity={item.quantity}
                            />
                            <UILabel htmlFor={id} className="title-small">
                              {item.label}
                            </UILabel>
                            <span>({item.quantity})</span>
                          </li>
                        )
                      })}
                    </UIList>
                  </>
                )}
              </>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

export default Facets
