import React from 'react'
import { Image } from 'src/components/ui/Image'

import storeConfig from '../../../../store.config'

interface ModalAllInProps {
  formConfirmation?: string
  description?: string
  btnText?: string
}

export const ModalAllIn = ({
  formConfirmation,
  description,
  btnText,
}: ModalAllInProps) => {
  const { account } = storeConfig
  const image = `https://${account}.vtexassets.com/arquivos/form_confirmation.png`

  return (
    <div className="modal-all-in">
      <Image
        className="modal-all-in__img"
        baseUrl={image}
        alt="img-conformation"
        sourceWidth={116}
        sourceHeight={127}
        loading="lazy"
        objectFit="contain"
        layout="constrained"
        backgroundColor="#f0f0f0"
        options={{
          fitIn: true,
        }}
      />
      <div className="modal-all-in__description-container">
        <p className="modal-all-in__form-confirmation">{formConfirmation}</p>
        <p className="modal-all-in__form-description">{description}</p>
        <a className="modal-all-in__button" href="/">
          {btnText}
        </a>
      </div>
    </div>
  )
}
