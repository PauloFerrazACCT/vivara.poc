import React, { useEffect, useState } from 'react'
import BuyButton from 'src/components/ui/BuyButton'
import Price from 'src/components/ui/Price'
import ProductTitle from 'src/components/ui/ProductTitle'
import QuantitySelector from 'src/components/ui/QuantitySelector'
import { Installment } from 'src/components/ui/Installment'
import { DiscountBadge } from 'src/components/ui/Badge'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import SkuSelector from 'src/components/modal/SkuSelectorModal'
import { useSelectedSKU } from 'src/contexts/ProductContext/useProductContext'
import './product-details.scss'
import ShippingSimulator from 'src/components/sections/ShippingSimulator'
import Button from 'src/components/ui/Button'
import InventoryFormModal from 'src/components/sections/InventoryCheck/InventoryForm'
import type { BrowserProductQueryQuery } from '@generated/graphql'
import ProductCustom from 'src/components/product/ProductCustom/ProductCustom'
import CustomizeIcon from 'src/components/icons/Customize'
import type { CurrencyCode, ViewItemEvent } from '@faststore/sdk'
import { sendAnalyticsEvent } from '@faststore/sdk'
import { useCart } from 'src/sdk/cart'
import { useSession } from 'src/sdk/session'
import { useWishlistContext } from 'src/contexts/wishlist-context'
import AddToWishlistModal from 'src/components/modal/AddToWishlistModal'
import SingleInputModal from 'src/components/modal/SingleInputModal'
import WishlistHeart from 'src/components/ui/WishlistHeart'
import OutOfStock from 'src/components/product/OutOfStock'
import MeasuresPdp from 'src/components/modal/MeasuresPdp'
import { useAvailableItems } from 'src/hooks/useAvailableItems'
import IconButton from 'src/components/ui/VivaraIconButton'
import CloseIcon from 'src/components/icons/Close'
import type { AnalyticsItem } from 'src/sdk/analytics/types'
import { useProduct } from 'src/sdk/product/useProduct'

import useOffer from './useOffer'
import ProductBenefits from '../ProductBenefits'
import { AddToCartLoadingSkeleton } from './AddCartLoadingSkeleton'

interface HandlePriceProps {
  lowPrice: number
  listPrice: number
}

const HandlePrice = ({ lowPrice, listPrice }: HandlePriceProps) => {
  return (
    <div className="product-details__prices">
      {listPrice > lowPrice ? (
        <>
          <Price
            value={listPrice}
            formatter={useFormattedPrice}
            testId="list-price"
            data-value={listPrice}
            variant="listing"
            classes="text-body-tiny"
            SRText="Original price:"
          />
          <Price
            value={lowPrice}
            formatter={useFormattedPrice}
            testId="price"
            data-value={lowPrice}
            variant="spot"
            classes="title-display"
            SRText="Sale Price:"
          />
        </>
      ) : (
        <Price
          value={lowPrice}
          formatter={useFormattedPrice}
          testId="price"
          data-value={lowPrice}
          variant="spot"
          classes="title-display"
          SRText="Original price:"
        />
      )}
      <Installment formatter={useFormattedPrice} value={lowPrice} />
    </div>
  )
}

const ProductDetails = ({
  hasVariantValue,
  sku,
  breadcrumbs,
  hasVariant,
  product,
}: any) => (
  <div className="product-details__items">
    <div
      className={
        hasVariantValue
          ? 'product-details__sku'
          : 'product-details__sku--disable'
      }
    >
      {hasVariantValue && (
        <SkuSelector
          defaultSku={sku}
          categoryTree={breadcrumbs.itemListElement}
          variants={hasVariant}
          product={product}
        />
      )}
    </div>
    <MeasuresPdp categoryTree={breadcrumbs.itemListElement} />
  </div>
)

const HandleAvailableProducts = ({
  hasVariantValue,
  sku,
  breadcrumbs,
  hasVariant,
  product,
  setAddQuantity,
  availableItemsValue,
  orderFormId,
  items,
  wasProductAdded,
  setWasProductAdded,
  wasProductRemoved,
  setWasProductRemoved,
  id,
  isProductAvailable,
  buyProps,
  removeProductFromWishlist,
  setIsSaveProductModalOpen,
  setIsInventoryModalOpen,
  addQuantity,
  seller,
}: any) => {
  return (
    <>
      <section className="product-details__settings">
        <ProductDetails
          hasVariantValue={hasVariantValue}
          sku={sku}
          breadcrumbs={breadcrumbs}
          hasVariant={hasVariant}
          product={product}
        />
        <div className="product-details__content-quantity">
          <QuantitySelector
            initial={1}
            min={1}
            max={10}
            onChange={setAddQuantity}
          />

          {availableItemsValue && availableItemsValue < 5 && (
            <span>
              {availableItemsValue === 1
                ? 'Apenas uma unidade disponível'
                : `(${availableItemsValue}) disponíveis`}
            </span>
          )}
        </div>
        <ProductCustom
          orderForm={{
            orderFormId,
            items,
          }}
          routes={{
            getAttachmentRoute: '',
            setAttachmentRoute: '/api/productCustomization/setAttachment',
            addProductRoute: '/api/productCustomization/addProduct',
          }}
          productData={product}
          addToCart={{
            BuyButtonComponent: BuyButton,
            useBuyButtonHook: useBuyButton,
          }}
          custom={{
            buttonCustomText: 'PERSONALIZAR',
            ButtonCustomIcon: <CustomizeIcon />,
            buttonCustomStyle: { letterSpacing: '0.1em' },
            modalTitleStyle: {
              fontFamily: 'Cormorant Garamond',
              fontSize: '24px',
              fontWeight: '600',
              letterSpacing: '0.15em',
            },
            modalCustomTextStyle: {
              color: '#96712F',
              fontSize: '23px',
            },
            modalButtonAddText: 'ADICIONAR À SACOLA',
            modalButtonClearText: 'LIMPAR TUDO',
            modalButtonSaveText: 'SALVAR PERSONALIZAÇÃO',
            modalDescriptionStyle: {
              color: '#737373',
              fontSize: '14px',
            },
            modalFormInputPlaceholder: 'Escreva aqui',
            modalFormText: 'Texto Personalizado',
          }}
        />
        {wasProductAdded && (
          <div className="moved-wishlist-product__container">
            <p className="moved-wishlist-product__text">
              Produto adicionado com sucesso!
            </p>
            <IconButton
              icon={<CloseIcon />}
              aria-label="Moved Product Confirmation Message"
              onClick={() => {
                setWasProductAdded(false)
              }}
            />
          </div>
        )}
        {wasProductRemoved && (
          <div className="deleted-wishlist-product__container">
            <p className="moved-wishlist-product__text">
              Produto removido com sucesso!
            </p>
            <IconButton
              icon={<CloseIcon />}
              aria-label="Moved Product Confirmation Message"
              onClick={() => {
                setWasProductRemoved(false)
              }}
            />
          </div>
        )}
        <div className="product-details__buttons">
          <BuyButton disabled={!isProductAvailable} {...buyProps}>
            ADICIONAR À SACOLA
          </BuyButton>
          <WishlistHeart
            id={id}
            hasBackgroundColor
            isOnShelf={false}
            onFilledHeartClick={() => {
              removeProductFromWishlist(id)
              setWasProductRemoved(true)
              setWasProductAdded(false)
            }}
            onEmptyHeartClick={() => {
              setIsSaveProductModalOpen(true)
              setWasProductRemoved(false)
            }}
            pdpPath={window.location.pathname}
          />
        </div>
        <Button
          className="inventory-check-button"
          onClick={() => setIsInventoryModalOpen(true)}
        >
          CONSULTE O ESTOQUE DA LOJA
        </Button>
      </section>
      <ShippingSimulator
        items={[
          {
            id: sku,
            quantity: addQuantity.toString(),
            seller: seller?.identifier,
          },
        ]}
      />
    </>
  )
}

function sendAnalytics({
  currency,
  price,
  isVariantOf,
  brand,
  sku,
  listPrice,
  name,
  gtin,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
Record<string, any>) {
  sendAnalyticsEvent<ViewItemEvent<AnalyticsItem>>({
    name: 'view_item',
    params: {
      currency: currency.code as CurrencyCode,
      value: price,
      items: [
        {
          item_id: isVariantOf.productGroupID,
          item_name: isVariantOf.name,
          item_brand: brand.name,
          item_variant: sku,
          price,
          discount: listPrice - price,
          currency: currency.code as CurrencyCode,
          item_variant_name: name,
          product_reference_id: gtin,
        },
      ],
    },
  })
}

function DetailsSideBar({ product }: BrowserProductQueryQuery) {
  const { items, id: orderFormId } = useCart()
  const { currency } = useSession()
  const { removeProductFromWishlist, createWishlist } = useWishlistContext()
  const [wasProductAdded, setWasProductAdded] = useState(false)
  const [wasProductRemoved, setWasProductRemoved] = useState(false)
  const [isSaveProductModalOpen, setIsSaveProductModalOpen] = useState(false)
  const [isCreateWishlistModalOpen, setIsCreateWishlistModalOpen] =
    useState(false)

  const [addQuantity, setAddQuantity] = useState(1)
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false)
  const selectedSKU = useSelectedSKU(product)
  const {
    id,
    name,
    gtin,
    additionalProperty,
    image: productImages,
    brand,
    isVariantOf,
    isVariantOf: { hasVariant },
    breadcrumbList: breadcrumbs,
  } = product

  const { sku } = selectedSKU
  const { availableItemsValue } = useAvailableItems({ sku })
  const { availability, listPrice, lowPrice, price, seller } = useOffer(
    product,
    selectedSKU
  )

  const { isValidating } = useProduct(product.id)
  const isProductAvailable = availability === 'https://schema.org/InStock'
  const hasVariantValue = hasVariant && hasVariant.length > 1
  const buyProps = useBuyButton({
    id,
    price,
    listPrice,
    seller,
    quantity: addQuantity,
    itemOffered: {
      sku,
      name,
      gtin,
      image: productImages,
      brand,
      isVariantOf,
      additionalProperty,
    },
  })

  const colecao = [...isVariantOf.additionalProperty].find(
    (itemColecao) => itemColecao.name === 'Coleção'
  )

  useEffect(() => {
    sendAnalytics({
      currency,
      price,
      isVariantOf,
      brand,
      sku,
      listPrice,
      name,
      gtin,
    })
  }, [currency, price, isVariantOf, brand, sku, listPrice, name, gtin])

  return (
    <>
      {isInventoryModalOpen && (
        <InventoryFormModal
          id={product.id}
          isInventoryModalOpen={isInventoryModalOpen}
          setIsInventoryModalOpen={setIsInventoryModalOpen}
        />
      )}
      {isSaveProductModalOpen && (
        <AddToWishlistModal
          product={product}
          productId={id}
          isOpen={isSaveProductModalOpen}
          setIsOpen={setIsSaveProductModalOpen}
          setWasProductAdded={setWasProductAdded}
          openWishlistModal={() => setIsCreateWishlistModalOpen(true)}
        />
      )}
      {isCreateWishlistModalOpen && (
        <SingleInputModal
          title="Dê um nome para sua lista"
          btnText="Salvar"
          isOpen={isCreateWishlistModalOpen}
          setIsOpen={setIsCreateWishlistModalOpen}
          setIsSaveProductModalOpen={setIsSaveProductModalOpen}
          modalAction={createWishlist}
          onClose={() => setIsSaveProductModalOpen(true)}
        />
      )}
      <section className="product-details__right-section grid-content grid-section">
        <header className="product-details__title">
          <ProductTitle
            title={<h1 className="title-product">{name}</h1>}
            categoryInfo={
              colecao !== undefined && brand.name === 'Life by Vivara' ? (
                <a
                  href={`/colecao/life-${colecao?.value
                    .toLocaleLowerCase()
                    .replace(' ', '-')
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')}`}
                  className="colecaoLink"
                >
                  Coleção {colecao?.value}
                </a>
              ) : (
                <a
                  href={`/colecao/${colecao?.value
                    .toLocaleLowerCase()
                    .replace(' ', '-')
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')}`}
                  className="colecaoLink"
                >
                  Coleção {colecao?.value}
                </a>
              )
            }
            label={
              <DiscountBadge
                listPrice={listPrice}
                spotPrice={isProductAvailable ? lowPrice : price}
              />
            }
          />
        </header>
        {isValidating ? (
          <AddToCartLoadingSkeleton />
        ) : (
          <>
            {' '}
            {isProductAvailable ? (
              <>
                <section className="product-details__values">
                  {listPrice > 0 && price > 0 && (
                    <HandlePrice lowPrice={lowPrice} listPrice={listPrice} />
                  )}
                </section>
                <HandleAvailableProducts
                  hasVariantValue={hasVariantValue}
                  sku={sku}
                  breadcrumbs={breadcrumbs}
                  hasVariant={hasVariant}
                  product={product}
                  setAddQuantity={setAddQuantity}
                  availableItemsValue={availableItemsValue}
                  orderFormId={orderFormId}
                  items={items}
                  wasProductAdded={wasProductAdded}
                  setWasProductAdded={setWasProductAdded}
                  wasProductRemoved={wasProductRemoved}
                  setWasProductRemoved={setWasProductRemoved}
                  id={id}
                  isProductAvailable={isProductAvailable}
                  buyProps={buyProps}
                  removeProductFromWishlist={removeProductFromWishlist}
                  setIsSaveProductModalOpen={setIsSaveProductModalOpen}
                  setIsInventoryModalOpen={setIsInventoryModalOpen}
                  addQuantity={addQuantity}
                  seller={seller}
                />
              </>
            ) : (
              <>
                {price && listPrice && (
                  <section className="product-details__values">
                    <HandlePrice lowPrice={price} listPrice={listPrice} />
                  </section>
                )}
                <OutOfStock
                  title=""
                  notificationMsg="Informe seu e-mail que avisaremos quando o produto estiver disponível!"
                  buttonTxt="Avise-me"
                  icon={<></>}
                  skuId={sku}
                />
              </>
            )}
          </>
        )}
        <ProductBenefits />
      </section>
    </>
  )
}

export default DetailsSideBar
