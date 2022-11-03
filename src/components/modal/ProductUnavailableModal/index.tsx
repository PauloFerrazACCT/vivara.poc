import { Button } from '@faststore/ui'
import React from 'react'
import { Link } from 'gatsby'
import IconButton from 'src/components/ui/IconButton'
import Close from 'src/images/svg/icon-close'

import './styles.scss'

interface ProductUnavailableModalProps {
  handleCloseModal(): void
}

function ProductUnavailableModal({
  handleCloseModal,
}: ProductUnavailableModalProps) {
  return (
    <div className="modal-product-unvailable">
      <div className="modal-product-unvailable__container">
        <div className="modal-product-unvailable__close-button">
          <IconButton
            icon={<Close />}
            aria-label="Close Modal Product Unavailable"
            onClick={handleCloseModal}
          />
        </div>
        <div className="modal-product-unvailable__container-title">
          <p className="modal-product-unvailable__title">
            Indisponível para entrega na sua região?
          </p>
        </div>
        <div className="modal-product-unvailable__container-description">
          <p className="modal-product-unvailable__description">
            Para ter uma busca mais precisa e garantida em nosso catálogo,
            insira o CEP de destino no topo da página. Assim poderemos oferecer
            uma melhor experiência de compra onde você estiver.
          </p>
        </div>
        <div className="modal-product-unvailable__actions">
          <Link to="/institucional/consulte-seu-cep">
            <Button className="modal-product-unvailable__button-secundary">
              COMO FAÇO ISSO?
            </Button>
          </Link>
          <Button
            className="modal-product-unvailable__button-primary"
            onClick={handleCloseModal}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductUnavailableModal
