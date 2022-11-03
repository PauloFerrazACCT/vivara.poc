/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IStoreSelectedFacet } from '@faststore/api'
import { Label as UILabel, List as UIList } from '@faststore/ui'
import type { Filter_FacetsFragment } from '@generated/graphql'
import React, { useEffect, useState } from 'react'
import Checkbox from 'src/components/ui/Checkbox'

import type { Values } from './Facets'

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

interface Props {
  values: any
  testId: string
  label: any
  selectedFacets: IStoreSelectedFacet[]
  filteredFacets: Filter_FacetsFragment[]
  onFacetChange: (item: IStoreSelectedFacet) => void
  KeyRef: any
}

function letterSeparetedArray(values: Values, caracter: string) {
  return values.filter(({ label }) => label.charAt(0) === caracter)
}

const getAlphabetValues = (values: any) => {
  const alphabetFilter: Values[] = []

  alphabet.forEach((caracter) =>
    alphabetFilter.push(letterSeparetedArray(values, caracter))
  )

  return alphabetFilter
}

function AphabetFilter({
  values,
  testId,
  label,
  selectedFacets,
  onFacetChange,
  KeyRef,
}: Props) {
  const [arraySetFilter, setArraySetFilter] = useState<Values>([])
  const [idRef, setIdRef] = useState<number>(0)
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

  const key = KeyRef
  const charactersList = getAlphabetValues(values)

  useEffect(() => {
    const oppenFilter: any = []

    for (const [index] of alphabet.entries()) {
      if (charactersList[index].length > 0) {
        oppenFilter.push(charactersList[index])
      }
    }

    if (isFirstLoad) {
      if (charactersList) {
        setArraySetFilter(oppenFilter[0])
        setIsFirstLoad(false)
      }
    }
  }, [isFirstLoad, values])

  function handleArrayAlphabet(characterList: Values, id: number) {
    setArraySetFilter(characterList)
    setIdRef(id)
  }

  return (
    <div className="flex-column">
      <div className="flex-row text-align">
        {alphabet.map((caracter, index) => {
          if (charactersList[index].length > 0) {
            return (
              <button
                key={index}
                id={`${index}`}
                className={`button-alphabet ${idRef === index && 'active'}`}
                onClick={() =>
                  handleArrayAlphabet(charactersList[index], index)
                }
              >
                {caracter}
              </button>
            )
          }

          return (
            <button key={index} className="button-alphabet" disabled>
              {caracter}
            </button>
          )
        })}
      </div>
      <UIList className="flex-wrap">
        {arraySetFilter?.map((item) => {
          const id = `${testId}-${label}-${item.label}`

          return (
            <li key={id} className="filter__item">
              <Checkbox
                id={id}
                checked={selectedFacets
                  .filter((facet) => facet.key === KeyRef)
                  .some(
                    (facet2) =>
                      facet2.value
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '') === item.value
                  )}
                onChange={() => onFacetChange({ key, value: item.value })}
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
    </div>
  )
}

export default AphabetFilter
