/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import IconButton from 'src/components/ui/VivaraIconButton'
import WishlistSizeSelector from 'src/components/ui/WishlistSizeSelector'
import { useProduct } from 'src/sdk/product/useProduct'
import { useWishlistContext } from 'src/contexts/wishlist-context'
import ConfirmationModal from 'src/components/modal/ConfirmationModal'
import AddToWishlistModal from 'src/components/modal/AddToWishlistModal'
import SingleInputModal from 'src/components/modal/SingleInputModal'
import WishlistMeasuresModal from 'src/components/modal/WishlistMeasuresModal'
import ClockwiseIcon from 'src/images/svg/icon-clockwise'
import ShareIcon from 'src/images/svg/icon-share'
import TrashIcon from 'src/images/svg/icon-trash'
import './styles.scss'
import CloseIcon from 'src/components/icons/Close'
import ShareProductModal from 'src/components/modal/ShareProductModal'

import WishlistBuyButton from './WishlistBuyButton'

interface WishlistProductProps {
  product: WishlistProduct
  productIndex: number
}

function WishlistProduct({ product, productIndex }: WishlistProductProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isAddProductToWishlistModalOpen, setIsAddProductToWishlistModalOpen] =
    useState(false)

  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const [isDeleted, setIsDeleted] = useState(false)
  const [wasProductMoved, setWasProductMoved] = useState(false)

  const [isChangeSizeModalOpen, setIsChangeSizeModalOpen] = useState(false)
  const [isCreateWishlistModalOpen, setIsCreateWishlistModalOpen] =
    useState(false)

  const { deleteProduct, createWishlist } = useWishlistContext()

  const { data } = useProduct(product.productId)

  if (!data) {
    return null
  }

  const {
    name,
    image,
    breadcrumbList: { itemListElement },
    offers: { offers },
  } = data.product

  const productInfo = data.product

  const [offer] = offers?.map((e) => e)

  const { availability } = offer

  const buyDisabled =
    availability !== 'https://schema.org/InStock' || !product.size

  const buyButtonProps = {
    buyDisabled,
    productInfo,
    offer,
  }

  const getUrl = window.location.origin

  const productUrl = `${getUrl}${
    itemListElement[itemListElement.length - 1].item
  }`

  const onDeleteModalClose = () => {
    deleteProduct(productIndex)
    setIsDeleted(true)
  }

  return (
    <>
      <div className="wishlist-product">
        <div className="wishlist-product__info wishlist-product__child">
          <img src={image?.[0].url} alt={name} />
          <p className="wishlist-product__name-clamp">{name}</p>
        </div>
        <div className="wishlist-product__actions wishlist-product__child">
          {data.product.isVariantOf.hasVariant.length > 1 && (
            <WishlistSizeSelector
              text={product.size ? `Tam. ${product.size}` : 'Tamanho'}
              onClick={() => setIsChangeSizeModalOpen(true)}
            />
          )}
          <div className="wishlist-product__icons">
            <IconButton
              icon={<ClockwiseIcon />}
              aria-label="Mover"
              onClick={() => setIsAddProductToWishlistModalOpen(true)}
            />
            <IconButton
              onClick={() => setIsShareModalOpen(true)}
              icon={<ShareIcon />}
              aria-label="Compartilhar"
            />
            <IconButton
              icon={<TrashIcon />}
              aria-label="Excluir"
              onClick={() => setIsDeleteModalOpen(true)}
            />
          </div>
        </div>
        <WishlistBuyButton {...buyButtonProps} />
      </div>
      {isDeleteModalOpen && (
        <ConfirmationModal
          headerText="Deseja excluir este produto?"
          bodyText="Ao excluir este produto ele deixará de fazer parte da sua lista de favoritos. Caso queira adicioná-lo novamente é só favoritar, você já sabe!"
          denyText="Cancelar"
          confirmText="Excluir produto"
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
          onConfirmAction={onDeleteModalClose}
        />
      )}
      {isAddProductToWishlistModalOpen && (
        <AddToWishlistModal
          product={product}
          productIndex={productIndex}
          isOpen={isAddProductToWishlistModalOpen}
          setIsOpen={setIsAddProductToWishlistModalOpen}
          setWasProductMoved={setWasProductMoved}
          openWishlistModal={() => setIsCreateWishlistModalOpen(true)}
        />
      )}
      {isCreateWishlistModalOpen && (
        <SingleInputModal
          title="Dê um nome para sua lista"
          btnText="Salvar"
          isOpen={isCreateWishlistModalOpen}
          setIsOpen={setIsCreateWishlistModalOpen}
          modalAction={createWishlist}
          onClose={() => setIsAddProductToWishlistModalOpen(true)}
        />
      )}
      {isChangeSizeModalOpen && (
        <WishlistMeasuresModal
          isOpen={isChangeSizeModalOpen}
          setIsOpen={setIsChangeSizeModalOpen}
          currentSize={product.size ?? 0}
          productIndex={productIndex}
        />
      )}
      {isDeleted && (
        <div className="deleted-product__container">
          <IconButton
            icon={<CloseIcon />}
            aria-label="Close Confirmation Message"
            onClick={() => {
              setIsDeleted(false)
            }}
          />
          <p className="deleted-product__text">Item excluído com sucesso!</p>
        </div>
      )}
      {wasProductMoved && (
        <div className="moved-product__container">
          <IconButton
            icon={<CloseIcon />}
            aria-label="Moved Product Confirmation Message"
            onClick={() => {
              setWasProductMoved(false)
            }}
          />
          <p className="moved-product__text">Produto movido com sucesso!</p>
        </div>
      )}
      {isShareModalOpen && (
        <ShareProductModal
          setIsShareModalOpen={setIsShareModalOpen}
          isShareModalOpen={isShareModalOpen}
          productUrl={productUrl}
        />
      )}
    </>
  )
}

export default WishlistProduct
