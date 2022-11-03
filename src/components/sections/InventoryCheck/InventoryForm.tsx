/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'src/components/ui/Button'
import { Modal } from '@faststore/ui'
import CloseIcon from 'src/components/icons/Close'
import IconButton from 'src/components/ui/IconButton'

import InputMask from '../../ui/InputMask'
import './styles.scss'

interface InventoryProps {
  id: string
  isInventoryModalOpen: boolean
  setIsInventoryModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface IPickupPoints {
  friendlyName: string
  address: {
    street: string
    number: string
    neighborhood: string
    city: string
  }
  businessHours: Array<{
    DayOfWeek: number
    OpeningTime: string
    ClosingTime: string
  }>
}

function InventoryFormModal({
  id,
  isInventoryModalOpen,
  setIsInventoryModalOpen,
}: InventoryProps) {
  const [postalCode, setPostalCode] = useState('')
  const [responseData, setResponseData] = useState<IPickupPoints[]>([])
  const [showResults, setShowResults] = useState(false)
  const [fetchStatusSuccess, setFetchStatusSuccess] = useState(true)
  const [buttonValue, setButtonValue] = useState('BUSCAR LOJAS')
  const handleClose = () => setIsInventoryModalOpen(false)

  const data = {
    items: [
      {
        id,
        quantity: 1,
        seller: '1',
      },
    ],
    country: 'BRA',
    postalCode,
  }

  const requestOptions = async () => {
    await axios({
      method: 'post',
      url: '/api/simulation',
      headers: {
        Accept: 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data,
    })
      .then((response) => {
        setResponseData(response.data.pickupPoints)
        setFetchStatusSuccess(true)

        return response
      })
      .catch(() => {
        setFetchStatusSuccess(false)
        setShowResults(false)
      })

    setShowResults(true)
    setButtonValue('FAZER NOVA BUSCA')
  }

  const weekday = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ]

  useEffect(() => {
    setShowResults(false)
  }, [postalCode])

  return (
    <Modal className="inventory-modal" isOpen={isInventoryModalOpen}>
      <IconButton
        icon={<CloseIcon />}
        aria-label="Fechar Modal de Consulta de Estoque"
        onClick={handleClose}
        className="close-inventory-button"
      />
      <form className="inventory-form">
        <span className="inventory-title">Encontre uma de nossas lojas</span>
        <span className="inventory-cep-span">CEP</span>
        <InputMask
          mask="cep"
          type="text"
          placeholder="00000-000"
          className="inventory-cep-input"
          onChange={(event: {
            target: { value: React.SetStateAction<string> }
          }) => {
            setPostalCode(event.target.value)
          }}
        />
        <Button
          className="inventory-search-button"
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            requestOptions()
          }}
        >
          {buttonValue}
        </Button>
      </form>
      {showResults ? (
        <>
          {fetchStatusSuccess && postalCode !== '' ? (
            <div>
              <h3 className="inventory-results-title">RESULTADO DA BUSCA</h3>
              <div className="search-result-container">
                {responseData.length > 0 ? (
                  responseData.map((item, index: number) => {
                    return (
                      <div key={index} className="search-result-item">
                        <p className="search-result-name">
                          {item.friendlyName}
                        </p>
                        <p className="search-result-address">
                          {item.address.street}, {item.address.number} -{' '}
                          {item.address.city}
                        </p>
                        <div className="businessHours-container">
                          {item.businessHours?.map((e, idx) => {
                            return (
                              <span key={idx} className="search-result-hours">
                                {weekday[e.DayOfWeek]}:{' '}
                                {e.OpeningTime.substring(0, 5)} às{' '}
                                {e.ClosingTime.substring(0, 5)}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className="no-results-message">
                    Não há estoque para este produto em nossas lojas. Por favor,
                    tente novamente mais tarde.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="failed-query-message">
              CEP inválido, por favor tente novamente.
            </p>
          )}
        </>
      ) : null}
    </Modal>
  )
}

export default InventoryFormModal
