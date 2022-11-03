import React from 'react'
import { Modal } from '@faststore/ui'

import './styles.scss'
import ProductCustomBuyButton from './ProductCustomBuyButton'

const HandleProductCustomModal = ({
  modalCustomStyle,
  modalVisible,
  modalCustomContainerStyle,
  handleCloseModal,
  modalTitleStyle,
  buttonCustomText,
  modalDescriptionStyle,
  attachmentConfig,
  modalImageStyle,
  productData,
  modalCustomTextStyle,
  customText,
  modalFormText,
  modalFormInputStyle,
  attachment,
  modalButtonClearStyle,
  clearCustomization,
  modalButtonClearText,
  customization,
  BuyButtonComponent,
  buyDisabled,
  modalButtonAddText,
  handleChange,
  buyProps,
}: any) => {
  const visualText = customText.map((line: string, lineIndex: number) => {
    return (
      <span key={lineIndex}>
        {line}
        <br />
      </span>
    )
  })

  const customImage = productData.image.find(
    (image: { url: string; alternateName: string }) => {
      return image.url.indexOf('_custom.') !== -1
    }
  )

  return (
    <Modal
      style={modalCustomStyle}
      className="modalCustom"
      isOpen={modalVisible}
    >
      <div style={modalCustomContainerStyle} className="modalCustomContainer">
        <div className="closeContainer">
          <button className="closeButton" onClick={handleCloseModal}>
            &#x2715;
          </button>
        </div>

        <div className="modalTitleContainer">
          <h2 style={modalTitleStyle} className="modalTitle">
            {buttonCustomText}
          </h2>
          <p style={modalDescriptionStyle} className="modalDescription">
            {`Máximo de ${attachmentConfig?.maxRows} linhas com ${attachmentConfig?.maxLenght} caracteres, alguns caracteres especiais não são válidos`}
          </p>
        </div>

        <div className="modalImageContainer">
          <img
            style={modalImageStyle}
            className="modalImage"
            src={customImage?.url ?? productData.image[0].url}
            alt="Product for customization"
          />
          <span style={modalCustomTextStyle} className="modalCustomText">
            {visualText}
          </span>
        </div>

        <div className="modalForm">
          <span className="modalFormText">{modalFormText}</span>
          {customText.map((text: string, index: number) => {
            return (
              <input
                key={index}
                data-key={index}
                style={modalFormInputStyle}
                maxLength={attachmentConfig.maxLenght}
                className={`modalFormInput ${
                  customization && customText ? 'modalFormInput__icon' : ''
                }`}
                placeholder={attachment?.Domains?.[index]?.FieldName}
                onChange={handleChange}
                value={text}
              />
            )
          })}
          <button
            style={modalButtonClearStyle}
            className="modalButtonClear"
            onClick={clearCustomization}
          >
            {modalButtonClearText}
          </button>
          <ProductCustomBuyButton
            buyProps={buyProps}
            BuyButtonComponent={BuyButtonComponent}
            buyDisabled={buyDisabled}
            modalButtonAddText={modalButtonAddText}
          />
        </div>
      </div>
    </Modal>
  )
}

export default HandleProductCustomModal
