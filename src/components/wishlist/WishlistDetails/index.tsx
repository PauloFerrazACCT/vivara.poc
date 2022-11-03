import React, { useEffect, useState } from 'react'
import MyAccountBody from 'src/components/common/MyAccountBody'
import IconButton from 'src/components/ui/VivaraIconButton'
import { navigate } from 'gatsby'
import { useNotificationContext } from 'src/contexts/notification-context'
import ToolPencilIcon from 'src/images/svg/icon-toolpencil'
import TrashIcon from 'src/images/svg/icon-trash'
import CloseIcon from 'src/components/icons/Close'

import { useWishlistContext } from '../../../contexts/wishlist-context'
import ConfirmationModal from '../../modal/ConfirmationModal'
import SingleInputModal from '../../modal/SingleInputModal'
import WishlistProduct from '../WishlistProduct'

import './styles.scss'

interface WishlistDetailsProps {
  list: Wishlist
}

interface WishlistActionsProps {
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsEditWishlistModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isDefaultWishlist: boolean
}

function WishlistActions({
  setIsDeleteModalOpen,
  setIsEditWishlistModalOpen,
  isDefaultWishlist,
}: WishlistActionsProps) {
  return (
    <div className="wishlist-details__actions">
      {isDefaultWishlist ? (
        <></>
      ) : (
        <IconButton
          icon={<ToolPencilIcon />}
          aria-label="Editar"
          onClick={() => setIsEditWishlistModalOpen(true)}
          className="wishlist-details__action"
        >
          <span>Editar Nome</span>
        </IconButton>
      )}

      {isDefaultWishlist ? (
        <></>
      ) : (
        <IconButton
          icon={<TrashIcon />}
          aria-label="Excluir"
          onClick={() => setIsDeleteModalOpen(true)}
          className="wishlist-details__action"
        >
          <span>Excluir lista</span>
        </IconButton>
      )}
    </div>
  )
}

function WishlistDetails({ list }: WishlistDetailsProps) {
  const {
    changeWishlistName,
    deleteWishlist,
    updateCurrentWishlist,
    currentWishlist,
  } = useWishlistContext()

  const { isShowing, hideNotificaton } = useNotificationContext()

  useEffect(() => {
    return () => {
      if (isShowing) {
        hideNotificaton()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowing])

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditWishlistModalOpen, setIsEditWishlistModalOpen] = useState(false)
  const [listName, setListName] = useState(list?.name ?? '')

  const [hasNameChanged, setHasNameChanged] = useState(false)
  const [wasListDeleted, setWasListDeleted] = useState(false)

  useEffect(() => {
    updateCurrentWishlist(list)

    return () => {
      updateCurrentWishlist()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDeleteClick = () => {
    navigate('/wishlist')
    deleteWishlist()
  }

  return (
    <MyAccountBody
      title={listName}
      iconType="return"
      onIconClickAnchor="/wishlist"
      moreActions={
        <WishlistActions
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setIsEditWishlistModalOpen={setIsEditWishlistModalOpen}
          isDefaultWishlist={list?.isDefault}
        />
      }
    >
      <div className="wishlist-details">
        {currentWishlist?.productList?.length ? (
          currentWishlist.productList?.map((product, index) => (
            <WishlistProduct
              key={index}
              product={product}
              productIndex={index}
            />
          ))
        ) : (
          <p className="wishlist-details__no-products">
            Você ainda não adicionou nenhum produto
          </p>
        )}
      </div>
      {isDeleteModalOpen && (
        <ConfirmationModal
          headerText="Tem certeza que deseja excluir?"
          bodyText="Ao excluir sua lista você exclui também os produtos que favoritou. Essa ação não poderá ser desfeita."
          denyText="Cancelar"
          confirmText="Sim, excluir"
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
          onConfirmAction={onDeleteClick}
          setWasListDeleted={setWasListDeleted}
        />
      )}
      {isEditWishlistModalOpen && (
        <SingleInputModal
          title="Edite o nome da sua lista"
          btnText="Salvar"
          isNewList={false}
          inputText={listName}
          setHasNameChanged={setHasNameChanged}
          setInputText={setListName}
          isOpen={isEditWishlistModalOpen}
          setIsOpen={setIsEditWishlistModalOpen}
          modalAction={changeWishlistName}
        />
      )}
      {hasNameChanged && (
        <div className="changed-list-name__container">
          <IconButton
            icon={<CloseIcon />}
            aria-label="Change Name Confirmation Message"
            onClick={() => {
              setHasNameChanged(false)
            }}
          />
          <p className="changed-list-name__text">Lista alterada com sucesso!</p>
        </div>
      )}
      {wasListDeleted && (
        <div className="deleted-list__container">
          <IconButton
            icon={<CloseIcon />}
            aria-label="Deleted List Confirmation Message"
            onClick={() => {
              setWasListDeleted(false)
            }}
          />
          <p className="deleted-list__text">Lista excluída com sucesso!</p>
        </div>
      )}
    </MyAccountBody>
  )
}

export default WishlistDetails
