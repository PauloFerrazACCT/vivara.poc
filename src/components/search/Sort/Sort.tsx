import { useSearch } from '@faststore/sdk'
import React, { useRef, useState } from 'react'
import Button from 'src/components/ui/Button'
import Select from 'src/components/ui/Select'
import { ArrowsDownUp as SortIcon, X as XIcon } from 'phosphor-react'
import SlideOver from 'src/components/ui/SlideOver'
import IconButton from 'src/components/ui/IconButton'

import './sort.scss'

type Callback = () => unknown

const OptionsMap = {
  price_desc: 'Maior Preço',
  price_asc: 'Menor Preço',
  orders_desc: 'Mais vendidos',
  name_asc: 'Alfabético (A-Z)',
  name_desc: 'Alfabético (Z-A)',
  release_desc: 'Lançamentos',
  discount_desc: 'Maior desconto',
  score_desc: 'Mais relevantes',
}

const keys = Object.keys(OptionsMap) as Array<keyof typeof OptionsMap>

const options: Record<string, string> = OptionsMap

function Sort() {
  const [isSortOpen, setIsSortOpen] = useState(false)
  const dismissTransition = useRef<Callback | undefined>()

  const {
    setState,
    state,
    state: { sort },
  } = useSearch()

  return (
    <>
      <div className="desktop-sort">
        <Select
          id="sort-select"
          className="sort / title-small"
          options={options}
          onChange={(e) => {
            setState({
              ...state,
              sort: keys[e.target.selectedIndex - 1],
              page: 0,
            })
          }}
          value={sort}
          testId="search-sort"
        />
      </div>
      <div className="mobile-sort">
        <Button
          variant="tertiary"
          data-testid="open-filter-button"
          icon={<SortIcon size={25} />}
          iconPosition="left"
          aria-label="Abrir filtros"
          onClick={() => setIsSortOpen(!isSortOpen)}
        >
          ORDENAR
        </Button>
      </div>

      <SlideOver
        isOpen={isSortOpen}
        onDismiss={() => setIsSortOpen(false)}
        onDismissTransition={(callback) =>
          (dismissTransition.current = callback)
        }
        size="partial"
        direction="rightSide"
        className="sort-modal__content"
      >
        <div className="sort-modal__body">
          <header className="sort-modal__header">
            <h2 className="title-display">Ordenar</h2>
            <IconButton
              data-testid="sort-modal-button-close"
              classes="sort-modal__button"
              aria-label="Fechar filtros"
              icon={<XIcon size={32} />}
              onClick={() => {
                dismissTransition.current?.()
              }}
            />
          </header>
          <div className="sort-list">
            {Object.keys(options)?.map((key, index) => (
              <Button
                key={key}
                className="sort-option"
                data-store-selected={key === sort}
                onClick={() => {
                  setState({ ...state, sort: keys[index] })
                  dismissTransition.current?.()
                }}
                onKeyDown={() => {
                  setState({ ...state, sort: keys[index] })
                  dismissTransition.current?.()
                }}
              >
                {options[key]}
              </Button>
            ))}
          </div>
        </div>
      </SlideOver>
    </>
  )
}

export default Sort
