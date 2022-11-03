import React, { useState, useEffect } from 'react'
import { useSession } from 'src/sdk/session'
import { useCart } from 'src/sdk/cart'
import FreightModal from 'src/components/modal/FreightModal'
import Spinner from 'src/components/common/Spinner'
import Truck from 'src/components/icons/Truck'
import Info from 'src/components/icons/Info'
import axios from 'axios'

import InputMask from '../../ui/InputMask'
import './shipping-simulator.scss'
import handleShippingData from './handleShippingData'
import { handleRegionalizeUser } from './handleRegionalizeUser'
import { handleDeliverySlas } from './handleDeliverySlas'

const ShippingSimulator = ({ items }: ShippingSimulatorProps) => {
  const { postalCode } = useSession()
  const [slas, setSlas] = useState([])
  const [openTooltip, setOpenTooltip] = useState(false)
  const [inputState, setInputState] = useState('blank')
  const [currentCep, setCep] = useState(postalCode ?? '')
  const [isLoadingSlas, setIsLoadingSlas] = useState(false)
  const { isValidating, ...partialSession } = useSession()
  const { id } = useCart()
  const isMobile = window.innerWidth < 1024

  const [hasCEPSaved, setHasCEPSaved] = useState<boolean>(false)

  useEffect(() => {
    const savedCEP = localStorage.getItem('current-cep')

    if (savedCEP) {
      setHasCEPSaved(true)
    }

    setCep(savedCEP ?? '')
  }, [])

  const saveSessionCEP = async (cep: string) => {
    localStorage.setItem('current-cep', cep)
  }

  const getSlas = async () => {
    localStorage.removeItem('current-cep')
    setIsLoadingSlas(true)
    setSlas([])
    if (
      isLoadingSlas ||
      !currentCep.match(/^[0-9]{5}-[0-9]{3}$/) ||
      currentCep === ''
    ) {
      setInputState('invalid')
      setSlas([])
      setIsLoadingSlas(false)

      return
    }

    const { data: postalCodeData } = await axios.post(
      '/api/getPostalCodeData',
      {
        postalCode: currentCep,
      }
    )

    const { state, city } = postalCodeData

    if (!state || !city) {
      setInputState('invalid')
      setSlas([])
      setIsLoadingSlas(false)

      return
    }

    // Fetched the data for delivery after regionalization or if the customer is already regionalized
    if (hasCEPSaved || postalCode === currentCep) {
      const slasFinal = await handleDeliverySlas(items, currentCep)

      setSlas(slasFinal.filter((slaFinal: any) => !!slaFinal))

      setIsLoadingSlas(false)
    } else {
      await handleRegionalizeUser({
        id,
        currentCep,
        postalCodeData,
        partialSession,
      })
      const data = await handleShippingData(items, currentCep)

      if (data.logisticsInfo?.[0].slas.length) {
        saveSessionCEP(currentCep)
      }

      setIsLoadingSlas(false)
      window.location.reload()
    }
  }

  useEffect(() => {
    if (hasCEPSaved) {
      getSlas()
      setHasCEPSaved(false)
    }
  }, [hasCEPSaved])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    if (slas.length) {
      setSlas([])
    }

    setInputState('blank')
    const cep = e.target.value

    setCep(cep)
  }

  const handleOpenTooltip = (tooltipState: boolean, isMob: boolean) => () => {
    if (isMob) {
      return
    }

    setOpenTooltip(tooltipState)
  }

  return (
    <div className="shipping-simulator">
      <div className="shipping-simulator__request-container">
        <div className="shipping-simulator__cep-title">
          <div className="shipping-simulator__cep-title-truck">
            <Truck />
          </div>
          Calcular frete e prazo de entrega
          <div className="shipping-simulator__cep-title-info">
            <div className="shipping-simulator__cep-title-tooltip">
              <div className="shipping-simulator__cep-title-tooltip-absolute">
                {openTooltip ? (
                  <div className="shipping-simulator__cep-title-tooltip-container">
                    <div className="shipping-simulator__cep-title-tooltip-content">
                      Os prazos de entrega são válidos à partir da
                      <span> confirmação do pagamento. </span>
                      Compra realizadas via cartão de crédito são aprovadas mais
                      rapidamente. Nossas entregas acontecem de
                      <span> segunda a sábado </span> e caso não seja concluída
                      por ausência do destinatário, ficará
                      <span> automaticamente agendada </span>
                      para o dia seguinte.
                    </div>
                  </div>
                ) : null}
              </div>
              <button
                className="shipping-simulator__cep-title-tooltip-open-button"
                onMouseEnter={handleOpenTooltip(true, isMobile)}
                onMouseLeave={handleOpenTooltip(false, isMobile)}
                onClick={handleOpenTooltip(!openTooltip, !isMobile)}
              >
                <Info />
              </button>
            </div>
          </div>
        </div>
        <div className="shipping-simulator__cep-container">
          <div className={`shipping-simulator__input-container ${inputState}`}>
            <InputMask
              className={`shipping-simulator__input ${inputState}`}
              onChange={handleInputChange}
              mask="cep"
              value={currentCep}
              placeholder="Digite o CEP"
              inputMode="numeric"
            />
          </div>
          {isLoadingSlas ? (
            <div className="shipping-simulator__button">
              <Spinner />
            </div>
          ) : (
            <button className="shipping-simulator__button" onClick={getSlas}>
              OK
            </button>
          )}
        </div>
      </div>
      {inputState === 'invalid' ? (
        <div className="shipping-simulator__cep-invalid">
          CEP Inválido. Digite novamente!
        </div>
      ) : null}
      {inputState === 'unavailable' ? (
        <div className="shipping-simulator__cep-invalid">
          O produto não pode ser entregue para este endereço.
        </div>
      ) : null}
      <div className="shipping-simulator__response-container">
        {slas.length ? (
          <>
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              slas.map((sla: any, key) => {
                return (
                  <div key={key} className="shipping-simulator__info-container">
                    <span className="shipping-simulator__info-name">
                      {sla?.name}{' '}
                      {sla?.shippingEstimate?.replace('bd', ' dia(s)')}
                    </span>
                    <span className="shipping-simulator__info-price">
                      {Math.round(sla?.price / 100).toFixed(2) === '0.00'
                        ? 'Grátis'
                        : `R$ ${Math.round(sla?.price / 100).toFixed(2)}`}
                    </span>
                  </div>
                )
              })
            }
            <FreightModal />
          </>
        ) : (
          <>
            <a
              target="_blank"
              href="https://buscacepinter.correios.com.br/app/endereco/index.php"
              className="shipping-simulator__link"
              rel="noreferrer"
            >
              Não sei meu cep
            </a>
          </>
        )}
      </div>
    </div>
  )
}

export default ShippingSimulator

interface ShippingSimulatorProps {
  items: Item[]
}
