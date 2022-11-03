import { Button } from '@faststore/ui'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'

import './styles.scss'

const Cookies: FC = () => {
  const [showModal, setModal] = useState<boolean>(false)

  const sendAcceptCookie = () => {
    setModal(false)
    localStorage.setItem('acceptCookie', 'true')
  }

  useEffect(() => {
    setModal(localStorage.getItem('acceptCookie') !== 'true')
  }, [])

  return (
    <>
      {showModal && (
        <div className="modal-cookies">
          <div className="modal-cookies__container">
            <p className="modal-cookies__description">
              <span className="modal-cookies__text">
                Coletamos dados estatísticos de visitas para melhorar sua
                experiência de navegação e personalizar conteúdo e anúncios. Ao
                continuar navegando você concorda com a nossa
                <a
                  className="modal-cookies__text--link"
                  href="https://www.vivara.com.br/institucional/politica-privacidade"
                >
                  <b> política de privacidade.</b>
                </a>
              </span>
            </p>
            <Button
              className="modal-cookies__button"
              onClick={() => sendAcceptCookie()}
            >
              CONCORDAR E FECHAR
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default Cookies
