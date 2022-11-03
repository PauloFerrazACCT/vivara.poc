import React from 'react'

import './styles.scss'

const ProductCustomBuyButton = ({
  buyProps,
  BuyButtonComponent,
  buyDisabled,
  modalButtonAddText,
}: any) => {
  return (
    <BuyButtonComponent
      className="modalButtonAdd"
      disabled={buyDisabled}
      {...buyProps}
    >
      SALVAR E {modalButtonAddText}
    </BuyButtonComponent>
  )
}

export default ProductCustomBuyButton
