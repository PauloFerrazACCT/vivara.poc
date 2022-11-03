import React, { useState, useRef } from 'react'
import { useCart } from 'src/sdk/cart'
import { set } from 'idb-keyval'
import Spinner from 'src/components/common/Spinner'
import axios from 'axios'
import { useSession, validateSession } from 'src/sdk/session'

import InputMask from '../../ui/InputMask'
import UseLocationButton from './UseLocationButton'
import './styles.scss'

function RegionModal({
  setIsOpen,
  isPageSearch,
  isHoverOnModal,
  setIsHoverOnModal,
  setIsUserRegionalized,
  setIsOnFocus,
}: RegionModalProps) {
  const [cep, setCep] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [inputState, setInputState] = useState('blank')
  const { id } = useCart()

  const { isValidating, ...partialSession } = useSession()
  const inputEl = useRef<HTMLButtonElement>(null)

  const handleInputChange = (e: any) => {
    setInputState('blank')
    const inputValue = e.target.value

    setCep(inputValue)
  }

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => {
    e?.preventDefault()
    setIsLoading(true)

    if ((!cep.match(/^[0-9]{5}-[0-9]{3}$/) || cep === '') && e) {
      setInputState('invalid')
      setIsLoading(false)

      return
    }

    const { data: postalCodeData } = await axios.post(
      '/api/getPostalCodeData',
      {
        postalCode: cep,
      }
    )

    const { data: newOrderFormId } = await axios.get('/api/getOrderFormId')

    if (id === '') {
      await set('main::store::cart', {
        id: newOrderFormId,
        items: {},
      })
    }

    const { state, city } = postalCodeData

    if (!state || !city) {
      setInputState('invalid')
      setIsLoading(false)

      return
    }

    try {
      const newSession = await validateSession({
        ...partialSession,
        postalCode: cep,
      })

      if (newSession) {
        await set('fs::session', newSession)
      }
    } catch (error) {
      console.error(error)
    }

    try {
      await axios.post('/api/regionalizeOrderform', {
        postalCodeData,
        orderformID: id === '' ? newOrderFormId : id,
      })
    } catch (error) {
      console.error(error)
    }

    try {
      await set('main::store::regionData', {
        city,
        state,
        hasModalOpened: true,
      })
    } catch (error) {
      console.error(error)
    }

    window.location.reload()
    setIsUserRegionalized(true)
    setIsOpen(false)
  }

  function handleKeyPress(event: any) {
    if (event.key === 'Enter') {
      if (inputEl.current) {
        inputEl.current.click()
      }
    }
  }

  const windowWidth = window.screen.width

  return (
    <div className="region-modal-wrapper" aria-hidden>
      <form
        className={
          isHoverOnModal
            ? 'region-modal__form has-hover-now'
            : 'region-modal__form'
        }
        onFocus={() => {
          setIsOpen(true)
          setIsOnFocus(true)
        }}
        onBlur={() => {
          setTimeout(() => {
            setIsOnFocus(false)
          }, 3000)
        }}
        onMouseLeave={() => {
          if (windowWidth > 640) {
            setTimeout(() => {
              setIsOpen(false)
              setIsHoverOnModal(false)
            }, 3000)
          }
        }}
        onMouseEnter={() => {
          setIsOpen(true)
          setIsHoverOnModal(true)
        }}
      >
        <button
          className="close-icon-modal"
          onClick={(e) => {
            setIsOpen(false)
            setIsHoverOnModal(false)
            e.preventDefault()
          }}
        >
          <svg
            data-close-icon
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5.00092 5.00092L1 9"
              stroke="#737373"
              strokeMiterlimit="10"
            />
            <path
              d="M9.00122 9L5.00031 4.99908L9.00122 1"
              stroke="#737373"
              strokeMiterlimit="10"
            />
          </svg>
        </button>
        <h5 className="region-modal__title">
          {isPageSearch
            ? 'Procurando algo especial?'
            : 'Encontre o melhor da Vivara perto de você'}
        </h5>
        <p className="region-modal__description">
          {isPageSearch
            ? 'Digite seu CEP e confira a disponibilidade para o seu endereço.'
            : 'Informe sua localização e confira o que pode ser entregue no seu endereço.'}
        </p>
        <div className="region-modal__input-wrapper">
          <div className={`region-modal__input-container ${inputState}`}>
            <InputMask
              mask="cep"
              type="tel"
              placeholder="Digite seu CEP"
              className={`region-modal__input ${inputState}`}
              onChange={handleInputChange}
              inputMode="numeric"
              onKeyPress={(event: React.KeyboardEvent) => handleKeyPress(event)}
            />
            {inputState === 'invalid' ? (
              <div className="region-modal__cep-invalid">
                CEP Inválido. Digite novamente!
              </div>
            ) : null}
          </div>
          <button
            className="region-modal__btn"
            type="submit"
            ref={inputEl}
            onClick={(e) => {
              handleSubmit(e)
            }}
          >
            {isLoading ? <Spinner /> : 'OK'}
          </button>
        </div>
        <UseLocationButton
          handleSubmit={handleSubmit}
          setCep={setCep}
          cep={cep}
        />
      </form>
    </div>
  )
}

export default RegionModal

interface RegionModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isUserRegionalized: boolean
  isPageSearch: boolean
  isHoverOnModal: boolean
  setIsHoverOnModal: React.Dispatch<React.SetStateAction<boolean>>
  setIsOnFocus: React.Dispatch<React.SetStateAction<boolean>>
  setIsUserRegionalized: React.Dispatch<React.SetStateAction<boolean>>
}
