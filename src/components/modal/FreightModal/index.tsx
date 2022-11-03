import { Button } from '@faststore/ui'
import React, { useState } from 'react'

import BaseModal from '../BaseModal'
import './styles.scss'

function FreightModal() {
  const [isFreightModalOpen, setIsFreightModalOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsFreightModalOpen(true)}
        className="open-modal-button"
      >
        SAIBA MAIS SOBRE OS TIPOS DE ENTREGA
      </Button>
      <BaseModal
        isOpen={isFreightModalOpen}
        onCloseButtonClick={() => setIsFreightModalOpen(false)}
        className="freight-modal"
      >
        <span className="freight-modal__title">Tipos de entrega</span>
        <span>
          <strong>Retirada em loja:</strong> à partir de 2 dia(s) úteis (grátis)
        </span>
        <span>
          <strong>Entrega normal:</strong> em 3 dia(s) úteis
        </span>
        <span>
          <strong>Entrega Rápida:</strong> em 2 dia(s) úteis (saindo de loja)
        </span>
        <Button
          className="freight-modal__close-button"
          onClick={() => setIsFreightModalOpen(false)}
        >
          FECHAR
        </Button>
      </BaseModal>
    </>
  )
}

export default FreightModal
