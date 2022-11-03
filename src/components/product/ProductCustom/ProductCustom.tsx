import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'

import getAttachment from './utils/useGetAttachment'
import type {
  Attachment,
  ProductCustomProps,
  TextAreaConfig,
  BuyPropsTypes,
} from './typings/productData'
import ProductCustomModal from './ProductCustomModal'
import './styles.scss'

const ProductCustom: FC<ProductCustomProps> = ({
  productData,
  addToCart: { BuyButtonComponent },
  custom: {
    buttonCustomText,
    ButtonCustomIcon,
    modalFormText,
    modalFormInputPlaceholder,
    modalButtonClearText,
    modalButtonAddText,
    buttonCustomStyle,
    modalCustomStyle,
    modalCustomContainerStyle,
    modalTitleStyle,
    modalDescriptionStyle,
    modalImageStyle,
    modalCustomTextStyle,
    modalFormInputStyle,
    modalButtonClearStyle,
  },
}) => {
  const { sku } = productData
  const [modalVisible, setModalVisible] = useState(false)
  const [haveAttachment, setHaveAttachment] = useState(false)
  const [buyDisabled, setBuyDisabled] = useState(
    productData?.offers?.offers?.[0]?.availability !==
      'https://schema.org/InStock'
  )

  const [customText, setCustomText] = useState<any>()
  const [customization, setCustomization] = useState<any>({})
  const [attachment, setAttachment] = useState<Attachment | null>(null)
  const [attachmentConfig, setAttachmentConfig] = useState<TextAreaConfig>({
    maxRows: 0,
    maxLenght: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAttachment({
        sku,
      })

      if (result.length > 0) {
        result?.map((attachmentMap: any) => {
          if (attachmentMap.Name.indexOf('Perso') >= 0) {
            const attachmentName: string = attachmentMap.Name
            const attachmentObj: any = attachmentMap

            if (attachmentName) {
              setAttachment(attachmentObj)

              const maxRows = attachmentObj.Domains.length
              const maxLenght = parseInt(
                attachmentObj.Domains[0].MaxCaracters,
                10
              )

              setCustomText(Array(maxRows).fill(''))

              setAttachmentConfig({
                maxRows,
                maxLenght,
              })

              setHaveAttachment(true)
            }
          }

          return null
        })
      }
    }

    fetchData()
  }, [])

  const buyProps: BuyPropsTypes = useBuyButton({
    id: productData.id,
    price: productData.offers.offers[0].price,
    listPrice: productData.offers.offers[0].listPrice,
    seller: productData.offers.offers[0].seller,
    quantity: 1,
    itemOffered: {
      sku: productData.sku,
      name: productData.name,
      gtin: productData.gtin,
      image: productData.image,
      brand: productData.brand,
      isVariantOf: productData.isVariantOf,
      additionalProperty: [customization],
    },
  })

  const stripEmojis = (str: string) =>
    str
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ''
      )
      .replace(/\s+/g, ' ')
      .trim()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const updatedText = customText
    const key = e.target.dataset.key ?? 0

    const value = stripEmojis(e.target.value)

    updatedText[key] = value

    const customizationValue =
      updatedText?.map((input: string, index: number) => {
        return `"${attachment?.Domains?.[index]?.FieldName}":"${input}"`
      }) || []

    const newCustomization = {
      name: attachment?.Name,
      valueReference: 'ATTACHMENT',
      value: `{${customizationValue?.toString()}}`,
    }

    setCustomization(newCustomization)
    setCustomText(updatedText)
    setBuyDisabled(false)
  }

  const clearCustomization = () => {
    setCustomText(Array(attachmentConfig.maxRows).fill(''))
    setCustomization({})
  }

  const handleCloseModal = () => {
    setCustomText(Array(attachmentConfig.maxRows).fill(''))
    setCustomization({})
    setModalVisible(!modalVisible)
  }

  return haveAttachment ? (
    <>
      <button
        style={buttonCustomStyle}
        className="buttonCustom"
        onClick={() => setModalVisible(!modalVisible)}
      >
        <span className="buttonCustom__text">{buttonCustomText}</span>
        <div className="buttonCustom__icon">{ButtonCustomIcon}</div>
      </button>
      <ProductCustomModal
        buyProps={buyProps}
        modalCustomStyle={modalCustomStyle}
        modalVisible={modalVisible}
        modalCustomContainerStyle={modalCustomContainerStyle}
        handleCloseModal={handleCloseModal}
        modalTitleStyle={modalTitleStyle}
        buttonCustomText={buttonCustomText}
        modalDescriptionStyle={modalDescriptionStyle}
        attachmentConfig={attachmentConfig}
        modalImageStyle={modalImageStyle}
        productData={productData}
        modalCustomTextStyle={modalCustomTextStyle}
        customText={customText}
        modalFormText={modalFormText}
        modalFormInputStyle={modalFormInputStyle}
        modalFormInputPlaceholder={modalFormInputPlaceholder}
        modalButtonClearStyle={modalButtonClearStyle}
        clearCustomization={clearCustomization}
        modalButtonClearText={modalButtonClearText}
        customization={customization}
        BuyButtonComponent={BuyButtonComponent}
        buyDisabled={buyDisabled}
        modalButtonAddText={modalButtonAddText}
        handleChange={handleChange}
        attachment={attachment}
      />
    </>
  ) : null
}

export default ProductCustom
