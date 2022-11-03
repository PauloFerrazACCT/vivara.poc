import type { ButtonHTMLAttributes, hooks, ReactNode } from 'react'

export interface ProductDataProps {
  sku: string
  name: string
  gtin: string
  description: string
  id: string
  isVariantOf: {
    name: string
    productGroupID: string
    additionalProperty: Array<{
      propertyID: string
      name: string
      value: any
      valueReference: string
    }>
    hasVariant: Array<{
      sku: string
      name: string
      description: string
      offers: {
        lowPrice: number
        offers: Array<{
          availability: string
          price: number
          listPrice: number
          seller: { identifier: string }
        }>
      }
      additionalProperty: Array<{
        propertyID: string
        name: string
        value: any
        valueReference: string
      }>
    }>
  }
  additionalProperty: Array<{
    propertyID: string
    name: string
    value: any
    valueReference: string
  }>
  image: Array<{ url: string; alternateName: string }>
  brand: { name: string }
  offers: {
    lowPrice: number
    offers: Array<{
      availability: string
      price: number
      listPrice: number
      seller: { identifier: string }
    }>
  }
  breadcrumbList: {
    itemListElement: Array<{ item: string; name: string; position: number }>
  }
}

interface AddToCartProps {
  BuyButtonComponent: ButtonHTMLAttributes
  useBuyButtonHook: hooks
}

interface CustomProps {
  buttonCustomText: string
  ButtonCustomIcon: ReactNode
  modalCustomDescription?: string
  modalFormText: string
  modalFormInputPlaceholder: string
  modalButtonClearText: string
  modalButtonAddText: string
  modalButtonSaveText: string
  buttonCustomStyle?: {
    width?: string
    height?: string
    fontFamily?: string
    fontSize?: string
    backgroundColor?: string
    color?: string
    border?: string
    cursor?: string
    letterSpacing?: string
  }
  modalCustomStyle?: {
    backgroundColor?: string
  }
  modalCustomContainerStyle?: {
    width?: string
    height?: string
    backgroundColor?: string
    color?: string
  }
  modalTitleStyle?: {
    fontFamily?: string
    fontSize?: string
    fontWeight?: string
    letterSpacing?: string
  }
  modalDescriptionStyle?: {
    fontFamily?: string
    fontSize?: string
    color?: string
  }
  modalImageStyle?: {
    width?: string
  }
  modalCustomTextStyle?: {
    width?: string
    fontFamily?: string
    fontSize?: string
    color?: string
  }
  modalFormInputStyle?: {
    width?: string
    height?: string
    border?: string
  }
  modalButtonClearStyle?: {
    fontFamily?: string
    fontSize?: string
    color?: string
  }
  modalButtonAddStyle?: {
    width?: string
    height?: string
    backgroundColor?: string
    border?: string
    fontFamily?: string
    fontSize?: string
    color?: string
    cursor?: string
  }
  modalButtonSaveStyle?: {
    width?: string
    height?: string
    backgroundColor?: string
    border?: string
    fontFamily?: string
    fontSize?: string
    color?: string
    cursor?: string
  }
}

interface OrderFormProps {
  orderFormId: string
  items: Array<{
    id: string
    quantity: number
  }>
}

interface RoutesProps {
  getAttachmentRoute: string
  setAttachmentRoute: string
  addProductRoute: string
}

interface BuyPropsTypes {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  'data-testid': string
  'data-sku': string | undefined
  'data-seller': string | undefined
}

export interface ProductCustomProps {
  productData: ProductDataProps
  addToCart: AddToCartProps
  routes: RoutesProps
  custom: CustomProps
  orderForm: OrderFormProps
}

export interface Attachment {
  map(arg0: (attachment: any) => void)
  length: number
  Id: number
  Name: string
  IsRequired: boolean
  IsActive: boolean
  Domains: Array<{
    FieldName: string
    MaxCaracters: string
    DomainValues: string
  }>
}

export interface TextAreaConfig {
  maxLenght: number
  maxRows: number
}
